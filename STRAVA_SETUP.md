# Strava Integration Setup

This guide will help you set up the Strava API integration for your portfolio website.

## Prerequisites

1. A Strava account
2. A Netlify account for deploying your site
3. Your portfolio site deployed on Netlify

## Step 1: Create a Strava API Application

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Click "Create App"
3. Fill in the application details:
   - **Application Name**: Your Portfolio Website
   - **Category**: Data Importer
   - **Club**: Leave blank
   - **Website**: Your portfolio website URL
   - **Application Description**: Portfolio website integration
   - **Authorization Callback Domain**: Your Netlify domain (e.g., `amazing-portfolio.netlify.app`)

4. After creating the app, note down:
   - **Client ID**
   - **Client Secret**

## Step 2: Get Your Athlete ID

1. Go to your Strava profile
2. Look at the URL - it will be something like `https://www.strava.com/athletes/147492590`
3. The number at the end (147492590) is your Athlete ID

## Step 3: Get Refresh Token

You need to authorize your application to access your data. Follow these steps:

1. Replace the placeholders in this URL with your actual Client ID and redirect URI:
```
https://www.strava.com/oauth/authorize?client_id=146084&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read_all,profile:read_all
```

2. Visit this URL in your browser and authorize the application
3. You'll be redirected to a URL that doesn't exist, but copy the `code` parameter from the URL
4. Use this code to get your refresh token by making a POST request:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -F client_id=YOUR_CLIENT_ID \
  -F client_secret=YOUR_CLIENT_SECRET \
  -F code=YOUR_AUTHORIZATION_CODE \
  -F grant_type=authorization_code
```

5. From the response, save the `refresh_token` value

## Step 4: Configure Netlify Environment Variables

In your Netlify dashboard:

1. Go to Site settings > Environment variables
2. Add these environment variables:
   - `STRAVA_CLIENT_ID`: Your Client ID from Step 1
   - `STRAVA_CLIENT_SECRET`: Your Client Secret from Step 1
   - `STRAVA_REFRESH_TOKEN`: Your Refresh Token from Step 3
   - `STRAVA_ATHLETE_ID`: Your Athlete ID from Step 2

## Step 5: Deploy Your Site

Deploy your site to Netlify. The Strava section should now display your real data!

## Troubleshooting

- **CORS Issues**: Make sure your Netlify domain is added to your Strava app's Authorization Callback Domain
- **Token Expired**: Refresh tokens are long-lived but can expire. If you get authentication errors, repeat Step 3
- **Rate Limits**: Strava has API rate limits. The function is designed to handle this gracefully
- **Missing Data**: If some stats show 0, it might be because you haven't done those activities recently

## Local Development

For local development, you can use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

This will run your functions locally at `/.netlify/functions/strava-stats`.
