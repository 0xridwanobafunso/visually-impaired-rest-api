# Visually Impaired Backend

# Installation

1. Install **XAMMP** (start Apache and MYSQL) or MYSQL workbench (root@127.0.0.1:3306)
2. Install **Node.js**
3. Clone **this repo**
4. Go to 127.0.0.1/phpmyadmin and create new database named voice_exam.
5. Import the voice_exam.sql in this root repo into the newly created database.
6. Install dependencies

   `npm run install`

7. Start server

   `npm run dev`

## Available Endpoints

### **Base_URL**: 127.0.0.1:3333

1. GET **{Base_URL}/** | ping server

2. GET **{Base_URL}/dumps** | dump admin login. you can now signin with (**username: admin & password: 123456789**)

3. POST **{Base_URL}/auths/admin-signin** | after successful admin authentication, it **generate token**. Request payload below.

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

4. POST **{Base_URL}/auths/admin-signup?token=** | sign up new admin with the **token generated at /admin-signin**. Request payload

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

5. POST **{Base_URL}/auths/student-signin** | after successful student authentication, it **generate token**. Request payload

   ```
       {{
           "username": "",
           "password": ""
       }}
   ```

6. POST **{Base_URL}/auths/student-signup?token=** | sign up new student with the **token generated at /admin-signin**. Request payload.

   ```
      {{
          "username": "",
          "password": ""
      }}
   ```

7. GET **{Base_URL}/accounts/admin?token=** | get all admin accounts with the **token generated at /admin-signin**

8. GET **{Base_URL}/accounts/student?token=** | get all student accounts with the **token generated at /admin-signin**

9. GET **{Base_URL}/questions/admin?token=** | get all questions added by admin with the **token generated at /admin-signin**

10. POST **{Base_URL}/questions/admin?token=** | add question by admin with the **token generated at /admin-signin**. Request payload

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

11. GET **{Base_URL}/questions/:id/admin?token=** | get a question by admin with the **token generated at /admin-signin** (where :id = question.id)

12. PUT **{Base_URL}/questions/:id/admin?token=** | update question by admin with the **token generated at /admin-signin** (where :id = question.id). Request payload

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

13. DELETE **{Base_URL}/questions/:id/admin?token=** | delete question by admin with the **token generated at /admin-signin** (where :id = question.id).

14. GET **{Base_URL}/questions/student?token=&total=** | get questions for student with the **token generated at /student-signin** with n numbers of questions (total=n). Scenario: Admin can decide to add 500 questions, whereas they only needed 70 questions (&total=70). In this system, the 500 questions will be shuffle and pick 70 questions randomly from the 500 questions.

15. POST **{Base_URL}/questions/student?token=** | submit student answers to backend to mark against answers in database with the **token generated at /student-signin** and save the score in scores table. Request payload

    ```
    [
        { question_id: '6', answer: 'c' },
        { question_id: '3', answer: 'b' },
        { question_id: '1', answer: 'b' }
    ]
    ```

16. GET **{Base_URL}/scores/student?token=** | get students scores by admin with the **token generated at /admin-signin**.

17. GET **{Base_URL}/scores/student/:id/attempts?token=** | get total attempts by a student with the **token generated at /admin-signin** (where :id = account.id)
