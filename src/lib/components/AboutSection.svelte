<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  
  let skills = [
    {
      category: "Cloud & Infrastructure",
      technologies: ["AWS", "Kubernetes", "Docker", "Cloudflare", "Ansible" , "Linux"]
    },
    {
      category: "Programming & Scripting", 
      technologies: ["Python", "Go", "JavaScript", "Bash", "PowerShell", "TypeScript"]
    },
    {
      category: "DevOps & Monitoring",
      technologies: ["IBM Instana", "Grafana", "PostgreSQL", "Prometheus", "Github Actions"]
    }
  ];
</script>

<section class="min-h-screen py-20 bg-secondary">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-primary mb-4">About Me</h2>
      <p class="text-xl text-primary max-w-3xl mx-auto">
        I'm a Computer Engineering student at Queen's University with hands-on experience in 
        site reliability engineering, DevOps automation, and cloud infrastructure management.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h3 class="text-2xl font-semibold text-primary mb-4">Education</h3>
        <div class="mb-6">
          <h4 class="text-lg font-medium text-primary mb-2">Computer Engineering</h4>
          <p class="text-primary font-medium mb-2">Queen's University, Kingston, Ontario</p>
          <p class="text-primary text-sm mb-3">September 2021 – April 2026 (Expected)</p>
        </div>
        <h3 class="text-2xl font-semibold text-primary mb-4">Interests</h3>
        <div class="space-y-6">
          <!-- Homelabbing & DevOps -->
          <div>
            <h4 class="font-medium text-primary-foreground mb-3">Homelabbing & DevOps</h4>
            <div class="flex gap-4 ml-4">
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Programming</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Automation</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Monitoring</span>
            </div>
          </div>
          
          <!-- Reading -->
          <div>
            <h4 class="font-medium text-primary-foreground mb-3">Reading</h4>
            <div class="flex gap-4 ml-4">
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Science Fiction</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Business</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Self-Improvement</span>
            </div>
          </div>
          
          <!-- Fitness -->
          <div>
            <h4 class="font-medium text-primary-foreground mb-3">Fitness</h4>
            <div class="flex gap-4 ml-4">
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Dragon Boat Racing</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Weightlifting</span>
              <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">Running</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img 
          src="/about.jpeg" 
          alt="Ben Probst" 
          class="rounded-lg shadow-lg w-90 h-90 object-cover"
        />
      </div>
    </div>

    <div>
      <h3 class="text-2xl font-semibold text-primary mb-8 text-center">Skills & Technologies</h3>
      <div class="grid md:grid-cols-3 gap-6">
        {#each skills as skill}
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">{skill.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                {#each skill.technologies as tech}
                  <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {tech}
                  </span>
                {/each}
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </div>
</section>
