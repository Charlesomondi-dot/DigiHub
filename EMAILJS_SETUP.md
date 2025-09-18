# EmailJS Setup Guide - Service: service_zkqz97o

## 🎯 Your EmailJS Configuration

**Service ID:** `service_zkqz97o` ✅ (Configured)
**Public Key:** `PfG9GlmarV2gcPcKk` ✅ (Configured)
**Target Email:** `charles@stjosephsttid.ac.ke` ✅ (Configured)

## 📋 Remaining Setup Steps

### ✅ Step 1: Public Key - COMPLETED
Your public key `PfG9GlmarV2gcPcKk` has been configured successfully!

### ⏳ Step 2: Create Email Template (ONLY REMAINING STEP)
1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Click **"Create New Template"**
3. Use this template structure:

**Subject:** `New Contact Form - Digital Hub`

**Content:**
```
Hello,

You have received a new contact form submission from Digital Hub:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Interest: {{age_group}}

Message:
{{message}}

---
Sent via Digital Hub Contact Form
Time: {{sent_time}}
```

4. **Save** the template and copy the **Template ID**

### Step 3: Update Template ID (FINAL STEP)
1. Open `script.js`
2. Find this line:
   ```javascript
   emailjsTemplateId: 'YOUR_TEMPLATE_ID', // You'll need to create a template
   ```
3. Replace with your actual template ID:
   ```javascript
   emailjsTemplateId: 'template_your_id_here',
   ```

## � Current Status

✅ **Service ID:** Configured (service_zkqz97o)
✅ **Public Key:** Configured (PfG9GlmarV2gcPcKk)
✅ **Target Email:** Configured (charles@stjosephsttid.ac.ke)
✅ **JavaScript:** Ready  
⏳ **Template:** Needs creation (ONLY STEP LEFT!)

## 🎉 Almost Ready!

After completing these steps, your contact form will:
- ✅ Validate user input in real-time
- ✅ Send emails directly to charles@stjosephsttid.ac.ke  
- ✅ Show success/error notifications
- ✅ Work on all devices (mobile, tablet, desktop)
- ✅ Handle form resets automatically

## 📧 Example Email Output

When someone submits the form, Charles will receive an email like:

```
Subject: New Contact Form - Digital Hub

Hello,

You have received a new contact form submission from Digital Hub:

Name: John Doe
Email: john@example.com
Phone: +1 234 567 8900
Interest: Adult Programs

Message:
I'm interested in learning more about your web development courses. 
What are the prerequisites and schedule options?

---
Sent via Digital Hub Contact Form
Time: 2025-08-18 14:30:00
```

Your EmailJS integration is almost ready! Just complete the 3 steps above.
