# Email Configuration Guide for Digital Hub

## 📧 Email Integration Setup

Your Digital Hub website is now configured to send form submissions to **charles@stjosephsttid.ac.ke**. Here are two recommended methods to set up email functionality:

## Method 1: EmailJS (Recommended) ⭐

EmailJS is the easiest way to send emails directly from your website without a backend server.

### Steps:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:
   ```
   Subject: New Contact Form Submission - Digital Hub
   
   From: {{from_name}} ({{from_email}})
   Phone: {{phone}}
   Age Group: {{age_group}}
   
   Message:
   {{message}}
   
   Sent from Digital Hub Contact Form
   ```

4. **Get Your Configuration Details**
   - Public Key: Found in "Account" → "General"
   - Service ID: From your email service
   - Template ID: From your email template

5. **Update the JavaScript**
   In `script.js`, replace these lines:
   ```javascript
   // Replace with your actual EmailJS configuration
   emailjs.init("YOUR_PUBLIC_KEY_HERE");
   
   // In the sendEmailWithEmailJS function, update:
   const response = await emailjs.send(
       'YOUR_SERVICE_ID',     // Replace with your service ID
       'YOUR_TEMPLATE_ID',    // Replace with your template ID
       // ... rest of the configuration
   );
   ```

6. **Update HTML**
   In `Digihub.html`, replace:
   ```javascript
   // emailjs.init("YOUR_PUBLIC_KEY");
   ```
   with:
   ```javascript
   emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");
   ```

## Method 2: Formspree (Alternative)

Formspree is another simple form handling service.

### Steps:

1. **Create a Formspree Account**
   - Go to [https://formspree.io/](https://formspree.io/)
   - Sign up for a free account

2. **Create a New Form**
   - Click "New Form"
   - Set the email to: `charles@stjosephsttid.ac.ke`
   - Copy the form endpoint URL

3. **Update the JavaScript**
   In `script.js`, update the CONFIG object:
   ```javascript
   const CONFIG = {
       emailTarget: 'charles@stjosephsttid.ac.ke',
       emailService: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your actual form ID
       // ... rest of config
   };
   ```

## Method 3: Simple mailto: Link (Basic Fallback)

If you want a simple solution without external services, you can use a mailto link:

1. **Update the form in HTML**
   Replace the form action:
   ```html
   <form action="mailto:charles@stjosephsttid.ac.ke" method="post" enctype="text/plain">
   ```

2. **Note**: This method opens the user's default email client and is less reliable.

## 🔧 Testing the Email Functionality

1. **Fill out the contact form** on your website
2. **Check for success/error notifications**
3. **Verify emails are received** at charles@stjosephsttid.ac.ke
4. **Test on different devices** (desktop, mobile)

## 🎯 Current Form Configuration

The contact form is already set up with:
- ✅ **Required field validation** (Name, Email, Message)
- ✅ **Email format validation**
- ✅ **Phone number validation**
- ✅ **Form submission handling**
- ✅ **Success/error notifications**
- ✅ **Loading states**

## 📱 Features Included

- **Real-time validation** with error messages
- **Responsive design** for all devices
- **Accessibility features** with proper labels
- **Form reset** after successful submission
- **Visual feedback** with notifications
- **Keyboard navigation** support

## 🔒 Security Considerations

- EmailJS and Formspree handle spam protection
- Form validation prevents malicious input
- No sensitive data stored locally
- HTTPS recommended for production

## 📞 Support

If you need help with setup:
1. Check the browser console for error messages
2. Verify your EmailJS/Formspree configuration
3. Test with different browsers
4. Ensure JavaScript is enabled

## 🚀 Quick Start (EmailJS)

For the fastest setup with EmailJS:

1. Sign up at emailjs.com
2. Get your public key, service ID, and template ID
3. Update these 3 values in your code
4. Test the form

That's it! Your contact form will be sending emails to charles@stjosephsttid.ac.ke.
