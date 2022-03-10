import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

const firstNameInput = () => screen.queryByPlaceholderText(/Edd/i)
const lastNameInput = () => screen.queryByPlaceholderText(/Burke/i)
const emailInput = () => screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i)
const submitBtn = () => screen.queryByText(/Submit/i);


beforeEach(() => {
    render(<ContactForm />)
})

test('renders without errors', () => {
 render(<ContactForm />);
});

test('renders the contact form header', () => {
 const header = screen.queryByText('Contact Form')
 expect(header).toBeInTheDocument();
 expect(header).toBeTruthy();
 expect(header).toHaveTextContent('Contact Form');
});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    userEvent.type(firstNameInput(), "qwe");

    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1);
});


test('renders THREE error messages if user enters no values into any fields.', async () => {
    userEvent.click(submitBtn());
    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(3)
});

/*[ ] the component renders THREE error messages if the user submits without filling in any values.*/

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    fireEvent.change(firstNameInput(), { target: { value: 'test'}})
    fireEvent.change(lastNameInput(), { target: { value: 'test'}})
    const errorMessages = await screen.findAllByTestId('error')

    expect(errorMessages).toHaveLength(1)
});

/*[ ] the component renders ONE error message if the user submits without filling in the email field.*/

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    fireEvent.change(emailInput(), { target: { value: 'test'}})
    const errorMessage = await screen.findByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument();
});

// [ ] the component renders the text *"email must be a valid email address"* if an invalid email address is typed into the email field.

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

// [ ] the component renders the text *"lastName is a required field"* the form is submitted without a last name.

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

// * [ ] the component renders the firstname, lastname and email text when submitted with valued fields and does **not** render a message value when one is not entered into the message field.

test('renders all fields text when all fields are submitted.', async () => {

});

// [ ] renders all fields when the user submits with valid text filled in for all fields.