<script lang="ts">
  import Navigation from './lib/components/Navigation.svelte';
  import HeroSection from './lib/components/HeroSection.svelte';
  import AboutSection from './lib/components/AboutSection.svelte';
  import ProjectsSection from './lib/components/ProjectsSection.svelte';
  import ContactSection from './lib/components/ContactSection.svelte';
  import GrafanaSection from '$lib/components/GrafanaSection.svelte';
</script>

<main class="min-h-screen">
  <Navigation />
  
  <section id="hero">
    <HeroSection />
  </section>
  
  <section id="about">
    <AboutSection />
  </section>

  <section id="grafana">
    <GrafanaSection />
  </section>
  
  <section id="projects">
    <ProjectsSection />
  </section>
  
  <section id="contact">
    <ContactSection />
  </section>
  
  <!-- Footer -->
  <footer class="bg-main text-primary py-8">
    <div class="max-w-6xl mx-auto px-8 text-center">
      <p class="!text-primary">
        © 2025 Ben Probst. Built with Svelte, Tailwind CSS, and Netlify.
      </p>
    </div>
  </footer>
</main>
