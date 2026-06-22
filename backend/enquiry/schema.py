import graphene
from graphene_django import DjangoObjectType
from .models import Enquiry

class EnquiryType(DjangoObjectType):
    class Meta:
        model = Enquiry

class CreateEnquiryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        phone = graphene.String(required=True)
        course = graphene.String(required=True)
        message = graphene.String(required=False)

    enquiry = graphene.Field(EnquiryType)

    def mutate(self, info, name, email, phone, course, message=""):
        enquiry = Enquiry(
            name=name,
            email=email,
            phone=phone,
            course=course,
            message=message,
        )
        enquiry.save()
        return CreateEnquiryMutation(enquiry=enquiry)

class ClearAllEnquiriesMutation(graphene.Mutation):
    class Arguments:
        confirm = graphene.String(required=False)

    success = graphene.Boolean()
    count = graphene.Int()
    error = graphene.String()

    def mutate(self, info, confirm=None):
        try:
            if not info.context.user.is_authenticated:
                return ClearAllEnquiriesMutation(
                    success=False,
                    count=0,
                    error="Authentication required"
                )
            count = Enquiry.objects.count()
            Enquiry.objects.all().delete()
            return ClearAllEnquiriesMutation(success=True, count=count, error=None)
        except Exception as e:
            return ClearAllEnquiriesMutation(
                success=False,
                count=0,
                error=str(e)
            )

class Query(graphene.ObjectType):
    all_enquiries = graphene.List(EnquiryType)

    def resolve_all_enquiries(self, info):
        if not info.context.user.is_authenticated:
            raise Exception("Authentication required")
        return Enquiry.objects.all().order_by('-created_at')

class Mutation(graphene.ObjectType):
    create_enquiry = CreateEnquiryMutation.Field()
    clearAllEnquiries = ClearAllEnquiriesMutation.Field()   # camelCase

schema = graphene.Schema(query=Query, mutation=Mutation)