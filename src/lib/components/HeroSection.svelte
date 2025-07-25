<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  
  let name = "Ben Probst";
  let title = "Computer Engineering Student & DevOps Engineer";
  let description = "Specializing in cloud infrastructure, automation, and site reliability engineering with expertise in CI/CD, containerization, and event-driven systems";
</script>

<section class="min-h-screen bg-gradient-to-br text-main flex items-center justify-center p-8">
  <div class="max-w-4xl mx-auto text-center">
    <div class="mb-8">
      <img 
        src="/avatar.jpeg" 
        alt="{name}" 
        class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl object-cover"
      />
    </div>
    
    <h1 class="text-5xl md:text-7xl font-bold mb-4 gradient-text">
      {name}
    </h1>
    
    <h2 class="text-2xl md:text-3xl text-secondary mb-6 font-light">
      {title}
    </h2>
    
    <p class="text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
      {description}
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        size="xxl"
        onclick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
      >
        View My Experience
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
