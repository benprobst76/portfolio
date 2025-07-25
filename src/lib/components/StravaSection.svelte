<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { onMount } from 'svelte';

  interface StravaStats {
    athlete: {
      firstname: string;
      lastname: string;
      profile: string;
      city: string;
      state: string;
      country: string;
    };
    stats: {
      recent_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elevation_gain: number;
      };
      all_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elevation_gain: number;
      };
      recent_ride_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elevation_gain: number;
      };
      all_ride_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elevation_gain: number;
      };
    };
    recent_activities: Array<{
      name: string;
      type: string;
      distance: number;
      moving_time: number;
      start_date: string;
      total_elevation_gain: number;
      average_speed: number;
    }>;
  }

  let stravaData: StravaStats | null = null;
  let loading = true;
  let error = '';

  // Helper functions
  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatSpeed(metersPerSecond: number): string {
    const kmPerHour = metersPerSecond * 3.6;
    return `${kmPerHour.toFixed(1)} km/h`;
  }

  async function fetchStravaData() {
    try {
      loading = true;
      error = '';
      
      const response = await fetch('/.netlify/functions/strava-stats');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Failed to fetch Strava data');
      }
      
      stravaData = data;
    } catch (err) {
      console.error('Error fetching Strava data:', err);
      error = err instanceof Error ? err.message : 'Failed to load Strava data';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchStravaData();
  });
</script>

<section class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Fitness & Activities</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Stay active and track my fitness journey through running and cycling activities.
      </p>
    </div>

    {#if loading}
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p class="mt-4 text-gray-600">Loading Strava data...</p>
      </div>
    {:else if error}
      <div class="text-center">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-700 mb-4">Failed to load Strava data</p>
          <p class="text-sm text-red-600">{error}</p>
          <button 
            on:click={fetchStravaData}
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    {:else if stravaData}
      <!-- Athlete Profile -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center mb-4">
          <img 
            src={stravaData.athlete.profile} 
            alt="{stravaData.athlete.firstname} {stravaData.athlete.lastname}"
            class="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              {stravaData.athlete.firstname} {stravaData.athlete.lastname}
            </h3>
            <p class="text-gray-600">
              {stravaData.athlete.city}, {stravaData.athlete.state}
            </p>
          </div>
        </div>
        <a 
          href="https://strava.com/athletes/147492590" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/>
          </svg>
          Follow on Strava
        </a>
      </div>

      <!-- Stats Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- All-Time Running Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center text-lg">
              <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
              </svg>
              All-Time Running
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Distance:</span>
                <span class="font-semibold">{stravaData.stats.all_run_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Runs:</span>
                <span class="font-semibold">{stravaData.stats.all_run_totals.count.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.all_run_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Elevation:</span>
                <span class="font-semibold">{stravaData.stats.all_run_totals.elevation_gain.toLocaleString()} m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Running Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center text-lg">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
              </svg>
              Recent Running
            </CardTitle>
            <CardDescription>Last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Distance:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Runs:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.count}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.recent_run_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Elevation:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.elevation_gain.toLocaleString()} m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- All-Time Cycling Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center text-lg">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 6a2 2 0 100 4 2 2 0 000-4zM16 6a2 2 0 100 4 2 2 0 000-4zM5.5 8L8 4h4l2.5 4"/>
              </svg>
              All-Time Cycling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Distance:</span>
                <span class="font-semibold">{stravaData.stats.all_ride_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Rides:</span>
                <span class="font-semibold">{stravaData.stats.all_ride_totals.count.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.all_ride_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Elevation:</span>
                <span class="font-semibold">{stravaData.stats.all_ride_totals.elevation_gain.toLocaleString()} m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Cycling Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center text-lg">
              <svg class="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 6a2 2 0 100 4 2 2 0 000-4zM16 6a2 2 0 100 4 2 2 0 000-4zM5.5 8L8 4h4l2.5 4"/>
              </svg>
              Recent Cycling
            </CardTitle>
            <CardDescription>Last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Distance:</span>
                <span class="font-semibold">{stravaData.stats.recent_ride_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Rides:</span>
                <span class="font-semibold">{stravaData.stats.recent_ride_totals.count}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.recent_ride_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Elevation:</span>
                <span class="font-semibold">{stravaData.stats.recent_ride_totals.elevation_gain.toLocaleString()} m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Recent Activities -->
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Recent Activities</h3>
        <div class="space-y-4">
          {#each stravaData.recent_activities as activity}
            <Card>
              <CardContent class="p-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <div class="w-2 h-2 rounded-full {activity.type === 'Run' ? 'bg-red-500' : 'bg-blue-500'} mr-3"></div>
                      <h4 class="font-semibold text-lg">{activity.name}</h4>
                      <span class="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {activity.type}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm">{formatDate(activity.start_date)}</p>
                  </div>
                  <div class="mt-4 sm:mt-0 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div class="text-sm text-gray-600">Distance</div>
                      <div class="font-semibold">{activity.distance} km</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-600">Time</div>
                      <div class="font-semibold">{formatTime(activity.moving_time)}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-600">Avg Speed</div>
                      <div class="font-semibold">{formatSpeed(activity.average_speed)}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-600">Elevation</div>
                      <div class="font-semibold">{activity.total_elevation_gain} m</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>