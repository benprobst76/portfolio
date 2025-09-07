<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen = false;
  }
  function scrollToDiv(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen = false;
  }

</script>

<nav class="fixed top-0 w-full bg-main/80 backdrop-blur-md shadow-sm z-50">
  <div class="max-w-6xl mx-auto px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <span class="text-xl font-bold text-primary">Ben Probst</span>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:block">
        <div class="flex items-center space-x-8">
          <button
            on:click={() => scrollToSection('hero')}
            class="text-primary hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            on:click={() => scrollToSection('about')}
            class="text-primary hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            on:click={() => scrollToSection('grafana')}
            class="text-primary hover:text-primary transition-colors"
          >
            Homelab
          </button>
          <button
            on:click={() => scrollToSection('strava')}
            class="text-primary hover:text-primary transition-colors"
          >
            Fitness
          </button>
          <button
            on:click={() => scrollToSection('projects')}
            class="text-primary hover:text-primary transition-colors"
          >
            Projects
          </button>
          <button
            on:click={() => scrollToSection('contact')}
            class="text-primary hover:text-primary transition-colors"
          >
            Contact
          </button>
          <a 
            href="/Resume.pdf" 
            target="_blank"
            class="inline-block"
          >
            <Button size="sm" class="bg-primary hover:bg-accent">
              Resume
            </Button>
          </a>
        </div>
      </div>
      
      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          on:click={toggleMenu}
          class="text-primary hover:text-primary focus:outline-none"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Navigation -->
  {#if isMenuOpen}
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-main border-t">
        <button
          on:click={() => scrollToSection('hero')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          Home
        </button>
        <button
          on:click={() => scrollToSection('about')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          About
        </button>
        <button
          on:click={() => scrollToSection('strava')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          Fitness
        </button>
        <button
          on:click={() => scrollToSection('grafana')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          Homelab
        </button>
        <button
          on:click={() => scrollToSection('projects')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          Projects
        </button>
        <button
          on:click={() => scrollToSection('contact')}
          class="block px-3 py-2 text-primary hover:text-primary transition-colors w-full text-left"
        >
          Contact
        </button>
        <div class="px-3 py-2">
          <a 
            href="/Resume.pdf" 
            target="_blank"
            class="inline-block w-full"
          >
            <Button size="sm" class="bg-primary hover:bg-accent w-full">
              Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>
