# Appwrite Email Integration Setup Guide

## Overview

This guide will help you integrate email functionality into your Elite Gym application using Appwrite's built-in email service. You'll be able to send verification emails, password resets, and custom notifications.

---

## Prerequisites

- Access to Appwrite Console (https://cloud.appwrite.io)
- Project ID: `696c057c003136f156e4`
- Database ID: `696c0b35001452976f17`
- Auth Collection ID: `696d3463003347783c46`
- Email provider credentials (Gmail, SendGrid, Mailgun, etc.)

---

## Step 1: Configure SMTP in Appwrite Console

### Option A: Using Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Elite Gym" as the name
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Configure in Appwrite Console**
   - Navigate to https://cloud.appwrite.io
   - Select your project: `Elite Gym` (696c057c003136f156e4)
   - Go to **Settings** → **SMTP**
   - Fill in the details:
     ```
     SMTP Host: smtp.gmail.com
     SMTP Port: 465
     SMTP Security: SSL/TLS
     SMTP Username: your-email@gmail.com
     SMTP Password: [paste 16-character app password]
     Sender Email: your-email@gmail.com
     Sender Name: Elite Gym
     ```
   - Click **Update**

### Option B: Using SendGrid (Recommended for Production)

1. **Create SendGrid Account**
   - Sign up at https://sendgrid.com (free tier: 100 emails/day)

2. **Generate API Key**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it "Elite Gym" and select "Full Access"
   - Copy the API key (starts with `SG.`)

3. **Configure in Appwrite Console**
   - Navigate to https://cloud.appwrite.io
   - Select your project
   - Go to **Settings** → **SMTP**
   - Fill in the details:
     ```
     SMTP Host: smtp.sendgrid.net
     SMTP Port: 587
     SMTP Security: TLS
     SMTP Username: apikey
     SMTP Password: [paste SendGrid API key]
     Sender Email: noreply@yourdomain.com
     Sender Name: Elite Gym
     ```
   - Click **Update**

### Option C: Using Mailgun

1. **Create Mailgun Account**
   - Sign up at https://mailgun.com

2. **Get SMTP Credentials**
   - Go to Sending → Domain Settings
   - Find SMTP credentials section
   - Copy hostname, username, and password

3. **Configure in Appwrite Console**
   ```
   SMTP Host: smtp.mailgun.org
   SMTP Port: 587
   SMTP Security: TLS
   SMTP Username: [your mailgun username]
   SMTP Password: [your mailgun password]
   Sender Email: noreply@yourdomain.com
   Sender Name: Elite Gym
   ```

---

## Step 2: Enable Email/Password Authentication

1. **Navigate to Auth Settings**
   - Open Appwrite Console
   - Go to **Auth** section
   - Click on **Settings** tab

2. **Enable Email/Password**
   - Find "Email/Password" in the "Auth Methods" section
   - Toggle it **ON**
   - Enable "Email Verification" (recommended)
   - Save changes

3. **Update Appwrite Config in Your Code**
   
   Edit `lib/appwrite.ts`:
   ```typescript
   import { Client, Databases, ID, Storage, Account } from 'appwrite';
   
   export const appwriteConfig = {
     endpoint: 'https://cloud.appwrite.io/v1',
     projectId: '696c057c003136f156e4',
     databaseId: '696c0b35001452976f17',
     authCollectionId: '696d3463003347783c46',
   };
   
   export const client = new Client()
     .setEndpoint(appwriteConfig.endpoint)
     .setProject(appwriteConfig.projectId);
   
   export const databases = new Databases(client);
   export const storage = new Storage(client);
   export const account = new Account(client); // Add this for authentication
   export { ID };
   ```

---

## Step 3: Implement Email Registration

Create a new registration function:

```typescript
// utils/auth.ts
import { account, ID } from '@/lib/appwrite';

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // Create account
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Send verification email
    await account.createVerification(
      `${window.location.origin}/verify-email`
    );

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error };
  }
};
```

---

## Step 4: Implement Email Login

Create login function:

```typescript
// utils/auth.ts
export const loginWithEmail = async (
  email: string,
  password: string
) => {
  try {
    const session = await account.createEmailPasswordSession(
      email,
      password
    );

    // Get user details
    const user = await account.get();

    return { success: true, user, session };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error };
  }
};
```

---

## Step 5: Email Verification

1. **Create Verification Page**
   
   Create `app/verify-email/page.tsx`:
   ```typescript
   'use client';
   
   import { useEffect, useState } from 'react';
   import { useSearchParams } from 'next/navigation';
   import { account } from '@/lib/appwrite';
   import toast from 'react-hot-toast';
   
   export default function VerifyEmail() {
     const [status, setStatus] = useState('verifying');
     const searchParams = useSearchParams();
     
     useEffect(() => {
       const verify = async () => {
         const userId = searchParams.get('userId');
         const secret = searchParams.get('secret');
         
         if (!userId || !secret) {
           setStatus('error');
           return;
         }
         
         try {
           await account.updateVerification(userId, secret);
           setStatus('success');
           toast.success('Email verified successfully!');
         } catch (error) {
           setStatus('error');
           toast.error('Verification failed');
         }
       };
       
       verify();
     }, [searchParams]);
     
     return (
       <div className="min-h-screen flex items-center justify-center">
         {status === 'verifying' && <p>Verifying your email...</p>}
         {status === 'success' && <p>Email verified! You can now log in.</p>}
         {status === 'error' && <p>Verification failed. Please try again.</p>}
       </div>
     );
   }
   ```

---

## Step 6: Password Reset

1. **Create Password Reset Request**
   ```typescript
   // utils/auth.ts
   export const requestPasswordReset = async (email: string) => {
     try {
       await account.createRecovery(
         email,
         `${window.location.origin}/reset-password`
       );
       return { success: true };
     } catch (error) {
       return { success: false, error };
     }
   };
   ```

2. **Create Password Reset Page**
   
   Create `app/reset-password/page.tsx`:
   ```typescript
   'use client';
   
   import { useState } from 'react';
   import { useSearchParams } from 'next/navigation';
   import { account } from '@/lib/appwrite';
   import toast from 'react-hot-toast';
   
   export default function ResetPassword() {
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const searchParams = useSearchParams();
     
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       
       if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         return;
       }
       
       const userId = searchParams.get('userId');
       const secret = searchParams.get('secret');
       
       if (!userId || !secret) {
         toast.error('Invalid reset link');
         return;
       }
       
       try {
         await account.updateRecovery(
           userId,
           secret,
           password
         );
         toast.success('Password reset successfully!');
         // Redirect to login
       } catch (error) {
         toast.error('Password reset failed');
       }
     };
     
     return (
       <form onSubmit={handleSubmit}>
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="New password"
         />
         <input
           type="password"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
           placeholder="Confirm password"
         />
         <button type="submit">Reset Password</button>
       </form>
     );
   };
   ```

---

## Step 7: Email Templates (Optional Customization)

Appwrite uses default email templates, but you can customize them:

1. **Navigate to Email Templates**
   - Appwrite Console → Settings → Templates
   
2. **Available Templates**
   - Email Verification
   - Password Recovery
   - Magic URL (passwordless login)
   - Invitation emails

3. **Customize Templates**
   - Use variables like `{{user}}`, `{{team}}`, `{{url}}`
   - Add your branding and styling
   - Save changes

---

## Step 8: Test Email Delivery

1. **Send Test Email**
   ```typescript
   // In browser console or test page
   import { account, ID } from '@/lib/appwrite';
   
   // Test registration
   await account.create(
     ID.unique(),
     'test@example.com',
     'password123',
     'Test User'
   );
   
   // Check email inbox for verification
   ```

2. **Verify Email Sent**
   - Check spam/junk folder
   - Verify sender email matches your config
   - Click verification link

3. **Check Appwrite Logs**
   - Console → Logs
   - Filter by "email" to see delivery status

---

## Troubleshooting

### Emails Not Sending

1. **Check SMTP Credentials**
   - Verify username/password are correct
   - Check for typos in configuration

2. **Check Port and Security**
   - Port 465 requires SSL/TLS
   - Port 587 requires STARTTLS

3. **Gmail Specific**
   - Ensure 2FA is enabled
   - Use App Password, not regular password
   - Check "Less secure app access" is NOT enabled

4. **Check Appwrite Logs**
   - Look for SMTP errors
   - Verify connection is established

### Emails in Spam

1. **Add SPF Record** (for custom domain)
   ```
   v=spf1 include:_spf.google.com ~all
   ```

2. **Add DKIM** (SendGrid auto-configures)

3. **Use Custom Domain** instead of Gmail

---

## Security Best Practices

1. **Environment Variables**
   - Store SMTP credentials in Appwrite Console (not in code)
   - Never commit passwords to Git

2. **Rate Limiting**
   - Appwrite has built-in rate limiting
   - Prevents spam and abuse

3. **Email Verification**
   - Always enable email verification
   - Prevents fake accounts

4. **Password Requirements**
   - Minimum 8 characters
   - Mix of letters, numbers, symbols

---

## Next Steps

After completing email setup:

1. **Update Sign-in Pages** to use Appwrite Auth instead of localStorage
2. **Add Logout Functionality** using `account.deleteSession('current')`
3. **Implement Protected Routes** checking session status
4. **Add Social OAuth** (Google, GitHub) for easier login

---

## Example: Complete Auth Flow

```typescript
// utils/appwriteAuth.ts
import { account, ID } from '@/lib/appwrite';

export const auth = {
  // Register
  register: async (email: string, password: string, name: string) => {
    const user = await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    await account.createVerification(`${window.location.origin}/verify-email`);
    return user;
  },
  
  // Login
  login: async (email: string, password: string) => {
    return await account.createEmailPasswordSession(email, password);
  },
  
  // Logout
  logout: async () => {
    return await account.deleteSession('current');
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch {
      return null;
    }
  },
  
  // Request password reset
  resetPassword: async (email: string) => {
    return await account.createRecovery(
      email,
      `${window.location.origin}/reset-password`
    );
  },
};
```

---

## Resources

- [Appwrite Auth Documentation](https://appwrite.io/docs/products/auth)
- [Appwrite Email Documentation](https://appwrite.io/docs/advanced/platform/smtp)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid Setup Guide](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

---

**That's it!** Your Elite Gym app can now send emails for verification, password resets, and more. 🎉
