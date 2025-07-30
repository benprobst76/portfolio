<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  
  let skills = [
    {
      category: "Cloud & Infrastructure",
      technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Ansible"]
    },
    {
      category: "Programming & Scripting", 
      technologies: ["Python", "Go", "C++", "Bash", "PowerShell", "TypeScript"]
    },
    {
      category: "DevOps & Monitoring",
      technologies: ["IBM Instana", "CI/CD", "Linux", "PostgreSQL", "ROS", "Github Actions"]
    }
  ];
</script>

<section class="py-20 bg-secondary">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-main mb-4">About Me</h2>
      <p class="text-xl text-main max-w-3xl mx-auto">
        I'm a Computer Engineering student at Queen's University with hands-on experience in 
        site reliability engineering, DevOps automation, and cloud infrastructure management.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h3 class="text-2xl font-semibold text-main mb-4">Education & Background</h3>
        <div class="mb-6">
          <h4 class="text-lg font-medium text-main mb-2">Computer Engineering</h4>
          <p class="text-primary font-medium mb-2">Queen's University, Kingston, Ontario</p>
          <p class="text-main text-sm mb-3">September 2021 – April 2026 (Expected)</p>
          <p class="text-main text-sm">
            Notable Coursework: Operating Systems, Object-Oriented Programming, Digital Systems, 
            Computer Architecture, Data Structures, Algorithms, Computer Networks, Microprocessor 
            Interfacing, Embedded Systems, Electronics
          </p>
        </div>
        <p class="text-main">
          Currently gaining practical experience through internships at IBM, focusing on cloud 
          infrastructure, automation, and reliability engineering while building expertise in 
          modern DevOps practices and software development.
        </p>
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
      <h3 class="text-2xl font-semibold text-main mb-8 text-center">Skills & Technologies</h3>
      <div class="grid md:grid-cols-3 gap-6">
        {#each skills as skill}
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">{skill.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                {#each skill.technologies as tech}
                  <span class="px-3 py-1 bg-primary text-main rounded-full text-sm font-medium">
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
