exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Get environment variables
    const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
    const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      throw new Error('Missing Strava environment variables');
    }

    // Step 1: Get a new access token using the refresh token
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error(`Token refresh failed: ${tokenData.message}`);
    }

    const accessToken = tokenData.access_token;

    // Step 2: Get athlete stats
    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${process.env.STRAVA_ATHLETE_ID}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!statsResponse.ok) {
      throw new Error(`Strava API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();

    // Step 3: Get recent activities
    const activitiesResponse = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=5',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const activitiesData = await activitiesResponse.json();

    // Step 4: Get athlete profile info
    const athleteResponse = await fetch(
      'https://www.strava.com/api/v3/athlete',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const athleteData = await athleteResponse.json();

    // Format the response
    const formattedStats = {
      athlete: {
        firstname: athleteData.firstname,
        lastname: athleteData.lastname,
        profile: athleteData.profile,
        city: athleteData.city,
        state: athleteData.state,
        country: athleteData.country,
      },
      stats: {
        recent_run_totals: {
          count: statsData.recent_run_totals.count,
          distance: Math.round(statsData.recent_run_totals.distance / 1000 * 100) / 100, // Convert to km
          moving_time: statsData.recent_run_totals.moving_time,
          elevation_gain: statsData.recent_run_totals.elevation_gain,
        },
        all_run_totals: {
          count: statsData.all_run_totals.count,
          distance: Math.round(statsData.all_run_totals.distance / 1000 * 100) / 100, // Convert to km
          moving_time: statsData.all_run_totals.moving_time,
          elevation_gain: statsData.all_run_totals.elevation_gain,
        },
        recent_ride_totals: {
          count: statsData.recent_ride_totals.count,
          distance: Math.round(statsData.recent_ride_totals.distance / 1000 * 100) / 100, // Convert to km
          moving_time: statsData.recent_ride_totals.moving_time,
          elevation_gain: statsData.recent_ride_totals.elevation_gain,
        },
        all_ride_totals: {
          count: statsData.all_ride_totals.count,
          distance: Math.round(statsData.all_ride_totals.distance / 1000 * 100) / 100, // Convert to km
          moving_time: statsData.all_ride_totals.moving_time,
          elevation_gain: statsData.all_ride_totals.elevation_gain,
        },
      },
      recent_activities: activitiesData.map(activity => ({
        name: activity.name,
        type: activity.type,
        distance: Math.round(activity.distance / 1000 * 100) / 100, // Convert to km
        moving_time: activity.moving_time,
        start_date: activity.start_date,
        total_elevation_gain: activity.total_elevation_gain,
        average_speed: activity.average_speed,
      })),
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(formattedStats),
    };
  } catch (error) {
    console.error('Strava API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch Strava data',
        message: error.message 
      }),
    };
  }
};
