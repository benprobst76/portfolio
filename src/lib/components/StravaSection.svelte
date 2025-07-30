<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { onMount, afterUpdate } from 'svelte';

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
    };
    recent_activities: Array<{
      id: number;
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
  let stravaScriptLoaded = false;

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

  async function loadStravaScript(): Promise<void> {
    // Check if the bootstrap function is already available
    if ((window as any).__STRAVA_EMBED_BOOTSTRAP__) {
      console.log('Strava embed bootstrap already loaded');
      stravaScriptLoaded = true;
      return;
    }

    try {
      // Try loading the CDN script first as it's more reliable
      console.log('Loading Strava embed script from CDN...');
      return loadStravaScriptFromCDN();
    } catch (e) {
      console.error('Failed to load Strava script:', e);
      stravaScriptLoaded = false;
    }
  }

  function loadStravaScriptFromCDN(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('Falling back to CDN script...');
      
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      
      script.onload = () => {
        console.log('CDN script loaded successfully');
        stravaScriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        console.error('CDN script failed to load');
        stravaScriptLoaded = false;
        reject(new Error('Failed to load Strava script from CDN'));
      };
      
      document.head.appendChild(script);
    });
  }

  function initializeStravaEmbeds() {
    console.log('Attempting to initialize Strava embeds...');
    
    setTimeout(() => {
      const placeholders = document.querySelectorAll('.strava-embed-placeholder');
      console.log(`Found ${placeholders.length} embed placeholders`);
      
      // Check if the bootstrap function is available
      if ((window as any).__STRAVA_EMBED_BOOTSTRAP__) {
        console.log('Strava embed bootstrap found, running...');
        try {
          (window as any).__STRAVA_EMBED_BOOTSTRAP__();
          console.log('Strava embeds initialized successfully');
        } catch (e) {
          console.error('Error running Strava bootstrap:', e);
          fallbackToManualEmbeds(placeholders);
        }
      } else {
        console.warn('Strava bootstrap not found, using manual iframe approach');
        fallbackToManualEmbeds(placeholders);
      }
    }, 500);
  }

  function fallbackToManualEmbeds(placeholders: NodeListOf<Element>) {
    // Manually create iframe embeds as fallback
    placeholders.forEach((placeholder) => {
      const embedId = placeholder.getAttribute('data-embed-id');
      console.log(`Creating manual embed for activity ${embedId}`);
      
      if (embedId && embedId !== '0') {
        // Create iframe manually
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.strava.com/activities/${embedId}/embed/light`;
        iframe.width = '100%';
        iframe.height = '405';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.style.border = 'none';
        
        // Clear placeholder content and add iframe
        placeholder.innerHTML = '';
        placeholder.appendChild(iframe);
        
        // Cast to HTMLElement to access style properties
        const htmlPlaceholder = placeholder as HTMLElement;
        htmlPlaceholder.style.height = '405px';
        htmlPlaceholder.style.border = 'none';
        htmlPlaceholder.style.background = 'transparent';
      }
    });
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
      
      // Load Strava script and initialize embeds after data is loaded
      await loadStravaScript();
      initializeStravaEmbeds();
      
    } catch (err) {
      console.error('Error fetching Strava data:', err);
      error = err instanceof Error ? err.message : 'Failed to load Strava data';
    } finally {
      loading = false;
    }
  }

  // Re-initialize embeds when component updates
  afterUpdate(() => {
    if (stravaData && stravaScriptLoaded) {
      initializeStravaEmbeds();
    }
  });

  // Also try loading script immediately on mount
  onMount(async () => {
    // Pre-load Strava script
    try {
      await loadStravaScript();
      console.log('Strava script pre-loaded');
    } catch (e) {
      console.error('Failed to pre-load Strava script:', e);
    }
    
    // Then fetch data
    fetchStravaData();
  });
</script>

<section class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Some Critical Performance Metrics</h2>
      <p class="text-xl text-gray-900 max-w-3xl mx-auto">
        Fitness metrics...?
      </p>
    </div>

    {#if loading}
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p class="mt-4 text-gray-900">Loading Strava data...</p>
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
            <p class="text-gray-900">
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
                <span class="text-gray-900">Distance:</span>
                <span class="font-semibold">{stravaData.stats.all_run_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Runs:</span>
                <span class="font-semibold">{stravaData.stats.all_run_totals.count.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.all_run_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Elevation:</span>
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
                <span class="text-gray-900">Distance:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.distance.toLocaleString()} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Runs:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.count}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Time:</span>
                <span class="font-semibold">{formatTime(stravaData.stats.recent_run_totals.moving_time)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-900">Elevation:</span>
                <span class="font-semibold">{stravaData.stats.recent_run_totals.elevation_gain.toLocaleString()} m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <!-- Recent Activities -->
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Recent Activities</h3>
        <div class="grid md:grid-cols-2 gap-6">
          {#each stravaData.recent_activities as activity}
            <!-- Strava Embed with Fallback -->
            <div class="relative">
              <div class="strava-embed-placeholder w-full bg-gray-100 rounded-lg border border-gray-300 overflow-hidden" 
                   data-embed-type="activity" 
                   data-embed-id="{activity.id}" 
                   data-style="standard" 
                   data-from-embed="false"
                   style="min-height: 405px;">
                <!-- Fallback content while embed loads -->
                <div class="text-center p-6 flex flex-col justify-center h-full min-h-[405px]">
                  <div class="w-3 h-3 rounded-full {activity.type === 'Run' ? 'bg-red-500' : activity.type === 'Ride' ? 'bg-purple-500' : activity.type === 'Rowing' ? 'bg-blue-500' : activity.type === 'StandUpPaddling' ? 'bg-teal-500' : 'bg-gray-500'} mx-auto mb-3"></div>
                  <h4 class="font-semibold text-xl mb-2">{activity.name}</h4>
                  <p class="text-sm text-gray-600 mb-4">{formatDate(activity.start_date)}</p>
                  <div class="text-sm space-y-2 mb-4">
                    <p><strong>Distance:</strong> {activity.distance} km</p>
                    <p><strong>Time:</strong> {formatTime(activity.moving_time)}</p>
                    <p><strong>Speed:</strong> {formatSpeed(activity.average_speed)}</p>
                    <p><strong>Type:</strong> {activity.type === 'Rowing' ? 'Dragon Boat' : activity.type === 'StandUpPaddling' ? 'Outrigger Canoe' : activity.type}</p>
                  </div>
                  <a 
                    href="https://www.strava.com/activities/{activity.id}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View on Strava
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>