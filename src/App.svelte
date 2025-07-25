<script lang="ts">
  import Navigation from './lib/components/Navigation.svelte';
  import HeroSection from './lib/components/HeroSection.svelte';
  import AboutSection from './lib/components/AboutSection.svelte';
  import ExperienceSection from './lib/components/ExperienceSection.svelte';
  import ProjectsSection from './lib/components/ProjectsSection.svelte';
  import ContactSection from './lib/components/ContactSection.svelte';
    import StravaSection from '$lib/components/StravaSection.svelte';
</script>

<main class="min-h-screen">
  <Navigation />
  
  <section id="hero">
    <HeroSection />
  </section>
  
  <section id="about">
    <AboutSection />
  </section>

  <section id="strava">
    <StravaSection />
  </section>
  
  <section id="experience">
    <ExperienceSection />
  </section>
  
  <section id="projects">
    <ProjectsSection />
  </section>
  
  <section id="contact">
    <ContactSection />
  </section>
  
  <!-- Footer -->
  <footer class="bg-main text-main py-8">
    <div class="max-w-6xl mx-auto px-8 text-center">
      <p class="text-main">
        © 2025 Ben Probst. Built with SvelteKit and shadcn-svelte.
      </p>
    </div>
  </footer>
</main>
