Steps to configure GitHub Actions deploy with a Firebase service account

1. Create a Firebase service account JSON with the `Firebase Admin`/`Firebase Hosting` permissions.
   - In Google Cloud Console -> IAM & Admin -> Service accounts -> Create Service Account
   - Grant roles: "Firebase Admin" or at minimum "Firebase Hosting Admin" and "Service Account User".
   - Create and download a JSON key for the service account.

2. Base64-encode the JSON key and add it as a repository secret named `FIREBASE_SERVICE_ACCOUNT`:

   - Linux/macOS:
     ```bash
     base64 -w0 path/to/firebase-sa.json
     ```
   - Windows (PowerShell):
     ```powershell
     [Convert]::ToBase64String([IO.File]::ReadAllBytes('path\\to\\firebase-sa.json'))
     ```

   - In GitHub: go to your repository -> Settings -> Secrets and variables -> Actions -> New repository secret
     - Name: `FIREBASE_SERVICE_ACCOUNT`
     - Value: the base64 string you produced above

3. Ensure `.firebaserc` contains your project id under `projects.default` (it already does).
   - The workflow now reads the project id from `.firebaserc`. If missing, it falls back to `neat-fsmcrm`.

4. Confirm `package-lock.json` is committed (the repo already contains it).

5. After adding the secret, push a commit to trigger the workflow or re-run the failed workflow in GitHub Actions.

If you'd like, I can open the Actions run logs and point to the exact failure lines, or prepare a base64-encoded secret locally for you to copy.