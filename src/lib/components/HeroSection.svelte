<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  
  let name = "Ben Probst";
  let title = "Computer Engineering Student - DevOps Artisan - Dragon Boat Racer";
</script>

<section class="min-h-screen text-primary flex items-center justify-center p-8">
  <div class="max-w-4xl mx-auto text-center">
    <div class="mb-8">
      <img 
        src="/avatar.jpeg" 
        alt="{name}" 
        class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl object-cover"
      />
    </div>
    
    <h1 class="text-5xl md:text-7xl font-bold mb-4 text-primary">
      {name}
    </h1>
    
    <h2 class="text-2xl md:text-3xl text-secondary mb-6 font-light">
      {title}
    </h2>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        size="xxl"
        onclick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Contact Me
    </Button>
      <a 
        href="/Resume.pdf" 
        target="_blank"
        class="btn-outline px-8 py-3 inline-block text-center"
      >
        Download Resume
      </a>
    </div>
  </div>
</section>
