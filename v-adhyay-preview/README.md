# V Adhyay — Android APK build (no Android Studio needed on your PC)

This ZIP contains the React/Vite app plus a GitHub Actions workflow that builds an Android APK in the cloud. You do **not** need to install Android Studio locally. You do need a free GitHub account and an internet connection to run the cloud build.

## Get your APK

1. Download and extract this ZIP.
2. Open `https://github.com` and sign in (create a free account if needed).
3. Click **+** → **New repository**. Name it `v-adhyay`, choose **Private** or **Public**, and create it.
4. On the new repository page, choose **Add file** → **Upload files**.
5. Upload the *contents* of the extracted `v-adhyay-preview` folder (including the hidden `.github` folder). If the `.github` folder is hidden in Windows, enable **View → Show → Hidden items** in File Explorer. Make sure `.github/workflows/build-apk.yml` is present in the repository.
6. Click **Commit changes**.
7. Open the repository's **Actions** tab. If GitHub asks to enable workflows, enable them.
8. Select **Build V Adhyay Android APK** in the left sidebar, click **Run workflow**, then click the green **Run workflow** button.
9. Wait for the run to finish successfully. Open that completed run, scroll to **Artifacts**, and download **V-Adhyay-Android-APK**.
10. Extract the downloaded artifact ZIP. It contains `app-debug.apk`. Transfer it to your Android phone and install it. Android may ask you to allow installation from that source.

## Local web preview (optional)

Install Node.js 22 or newer, open a terminal in this folder, and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Notes

- The APK is built by GitHub Actions, not directly by VS Code. This workflow uses a debug APK suitable for testing and sharing; it is not a signed Play Store release.
- The current project contains demo/mock data. Packaging it as an APK does not turn mock login, demo dashboards, payments, or sessions into production backend services.
- If the build fails, open the failed GitHub Actions run and inspect the first red error step.
