<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
    import StravaSection from "./StravaSection.svelte";

  // Function to generate iframe HTML directly
  function getIframeHtml(panel: any): string {
    return `<iframe 
      src="${panel.src}"
      width="100%" 
      height="280" 
      frameborder="0"
      class="w-full block"
      title="${panel.title} - Grafana Panel"
      loading="lazy"
    ></iframe>`;
  }

  let panels = [
    {
      title: "RAM Usage",
      description: "Real RAM usage excluding cache and reclaimable memory",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=16&__feature.dashboardSceneSolo=true"
    },
    {
      title: "CPU Busy",
      description: "Overall CPU busy percentage (averaged across all cores)",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=20&__feature.dashboardSceneSolo=true"
    },
    {
      title: "Hardware Temperatures",
      description: "Monitors hardware sensor temperatures and critical thresholds as exposed by Linux hwmon. Includes CPU, GPU, and motherboard sensors where available",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=158&__feature.dashboardSceneSolo=true"
    },
    {
      title: "CPU Basic",
      description: "CPU time spent busy vs idle, split by activity type",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=77&__feature.dashboardSceneSolo=true"
    },
    {
      title: "Memory Basic",
      description: "RAM and swap usage overview, including caches",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=78&__feature.dashboardSceneSolo=true"
    },
    {
      title: "Network Traffic Basic",
      description: "Per-interface network traffic (receive and transmit) in bits per second",
      src: "https://grafana.zipbuilder.ca/d-solo/rYdddlPWk/node-exporter-full?orgId=1&timezone=browser&var-DS_PROMETHEUS=fex6xv4t6603kd&var-job=node-exporter&var-nodename=fedora&var-node=localhost:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&refresh=1m&theme=dark&panelId=74&__feature.dashboardSceneSolo=true"
    }
  ];
</script>

<section class="py-20 bg-background text-foreground">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        Homelab
      </h2>
    </div>
    <!-- Live Metrics Dashboard -->
    <div class="mb-12">
      <h3 class="text-3xl font-bold text-center mb-2">Live System Metrics</h3>
      <p class="text-center text-muted-foreground mb-8">
        Real-time data from my homelab server • Collected via Prometheus Node Exporter • Visualized with Grafana
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each panels as panel}
          <Card class="!p-0">
            <CardContent class="!p-0">
              <div class="relative overflow-hidden rounded-b-lg bg-background">
                {@html getIframeHtml(panel)}
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
    <!-- Strava Metrics -->
    <section id="strava">
     <StravaSection />
    </section>
  </div>
</section>
