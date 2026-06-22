import { gql } from '@apollo/client';

export const CREATE_ENQUIRY = gql`
  mutation CreateEnquiry($name: String!, $email: String!, $phone: String!, $course: String!, $message: String) {
    createEnquiry(name: $name, email: $email, phone: $phone, course: $course, message: $message) {
      enquiry {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_ALL_ENQUIRIES = gql`
  mutation ClearAllEnquiries($confirm: string!) {
    clearAllEnquiries(confirm: $confirm) {
      success
      count
      error
    }
  }
`;

export const GET_ALL_ENQUIRIES = gql`
  query GetAllEnquiries {
    allEnquiries {
      id
      name
      email
      phone
      course
      message
      createdAt
    }
  }
`;