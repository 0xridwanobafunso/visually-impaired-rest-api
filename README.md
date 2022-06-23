# Visually Impaired Backend

# Installation

1. Clone this repo
2. Install dependencies

   `npm run install`

3. Start server

   `npm run dev`

## Available Endpoints

### **Base_URL**: 127.0.0.1:3333

1. GET {Base_URL}/ | ping server

2. GET {Base_URL}/dumps | dump admin login. you can now signin with (**username: admin & password: 123456789**)

3. POST {Base_URL}/auths/admin-signin | after successful admin authentication, it **generate token**. Request payload below.

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

4. POST {Base_URL}/auths/admin-signup?token= | sign up new admin with the **token generated at /admin-signin**. Request payload

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

5. POST {Base_URL}/auths/student-signin | after successful student authentication, it **generate token**. Request payload

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

6. POST {Base_URL}/auths/student-signup?token= | sign up new student with the **token generated at /admin-signin**. Request payload.

   ```
      {{
          "username": "",
          "password": ""
      }}
   ```

7. GET {Base_URL}/accounts/admin?token= | get all admin accounts with the **token generated at /admin-signin**

8. GET {Base_URL}/accounts/student?token= | get all student accounts with the **token generated at /admin-signin**

9. GET {Base_URL}/questions/admin?token= | get all questions added by admin with the **token generated at /admin-signin**

10. POST {Base_URL}/questions/admin?token= | add question by admin with the **token generated at /admin-signin**. Request payload

    ```
    {{
        "question": "",
        "option_a": "",
        "option_b": "",
        "option_c": "",
        "option_d": "",
        "answer": "",
    }}
    ```

11. GET {Base_URL}/questions/:id/admin?token= | get a question by admin with the **token generated at /admin-signin** (where :id = question.id)

12. PUT {Base_URL}/questions/:id/admin?token= | update question by admin with the **token generated at /admin-signin** (where :id = question.id). Request payload

    ```
        {{
            "question": "",
            "option_a": "",
            "option_b": "",
            "option_c": "",
            "option_d": "",
            "answer": "",
        }}
    ```

13. DELETE {Base_URL}/questions/:id/admin?token= | delete question by admin with the **token generated at /admin-signin** (where :id = question.id).

14. GET {Base_URL}/questions/student?token=&total= | get questions for student with the **token generated at /student-signin** and total number of question. Scenario: Admin can decide to add 500 questions, whereas they only need 70 (&total=70). The 500 questions are shuffle and 70 are picked with randomly from all the 500 questions.

15. {Base_URL}/questions/student?token=

16. {Base_URL}/

17. {Base_URL}/
