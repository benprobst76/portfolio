<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  
  let projects = [
    {
      title: "Appliance Installation Management Software",
      description: "A multi-tenant SaaS Progressive Web App for appliance installation contractors to track employee hours, manage tasks, and monitor job site progress with real-time geolocation validation and role-based access control",
      image: "/aims.png",
      technologies: ["SvelteKit", "TypeScript", "Go", "PostgreSQL", "Docker", "AWS"],
      liveUrl: "https://aims.zipbuilder.ca",
      githubUrl: "#",
      period: "January 2025 – Present",
      type: "Personal Project"
    },
    {
      title: "Tool Sharing App",
      description: "A cross-platform tool sharing application using Flutter, enabling efficient community resource sharing with Firebase integration for robust database management and user authentication",
      image: "/drywallapp.jpeg", 
      technologies: ["Flutter", "Firebase", "Cross-platform"],
      liveUrl: "#",
      githubUrl: "https://github.com/SoslyLW/essdev-app-team",
      period: "September 2023 – April 2024",
      type: "Queen's Engineering Society"
    },
    {
      title: "Rover Wheel Control System",
      description: "An advanced drive and wheel control system utilizing C++ and ROS libraries with a sophisticated proportional-integral-derivative (PID) controller for enhanced rover adaptability to diverse terrains",
      image: "/rover.jpeg",
      technologies: ["C++", "ROS", "PID Control", "Robotics"],
      liveUrl: "#",
      githubUrl: "#",
      period: "September 2022 – April 2023",
      type: "Queen's Space Engineering Team"
    }
  ];
</script>

<section class="min-h-screen py-20 bg-secondary">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-primary mb-4">Projects</h2>
      <p class="text-xl text-primary max-w-3xl mx-auto">
        A collection of projects that demonstrate my technical skills across different domains, 
        from web applications to robotics systems.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project}
        <Card class="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="aspect-[5/4] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <CardTitle class="text-xl mb-1">{project.title}</CardTitle>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <span class="text-sm text-primary font-medium">{project.type}</span>
                  <span class="text-sm text-primary">{project.period}</span>
                </div>
              </div>
            </div>
            <CardDescription class="text-primary">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.technologies as tech}
                <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">
                  {tech}
                </span>
              {/each}
            </div>
            <div class="flex gap-2">
            {#if project.liveUrl !== '#' }
              <Button variant="outline" size="sm" class="flex-1">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </Button>
            {/if}
            {#if project.githubUrl !== '#' }
              <Button variant="outline" size="sm" class="flex-1">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            {/if}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</section>
