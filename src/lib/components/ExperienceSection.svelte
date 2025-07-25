<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  
  let experiences = [
    {
      title: "Site Reliability Engineer Intern",
      company: "IBM Ltd.",
      period: "May 2025 – Present",
      location: "Remote",
      description: [
        "Leveraged IBM Instana observability tools across metrics, logs, and traces to implement synthetic monitoring and smart alerting systems, enabling proactive identification of disruptions before they impact customers",
        "Designed event-driven automation to resolve recurring alerts using Ansible playbooks (e.g., clearing disk space, restarting services), automating ~25 incidents weekly and saving ~15 hours of SRE effort per week",
        "Extended monitoring coverage with custom Bash and PowerShell scripts, leading to enhanced discovery and improved root cause analysis, freeing up valuable DevOps resources and allowing the team to focus on high-impact tasks"
      ],
      technologies: ["IBM Instana", "Ansible", "Bash", "PowerShell", "Linux", "Monitoring"]
    },
    {
      title: "DevOps Engineer Intern",
      company: "IBM Ltd.",
      period: "January 2024 – December 2024",
      location: "Remote", 
      description: [
        "Implemented a sophisticated cost optimization strategy leveraging Terraform for Infrastructure as Code, encompassing intelligent provisioning of development servers allowing for suspension of cloud billing during shutdown intervals",
        "Integrated with a scheduled scaling of Kubernetes worker nodes and shutdown of servers based on demand, resulting in an annual cost reduction of $200,000, improving resource efficiency and demonstrating exceptional ROI",
        "Developed Ansible playbooks that are deployed across hundreds of servers and Kubernetes clusters, significantly reducing development time and lowering costs, enhancing the efficiency of server management processes"
      ],
      technologies: ["Terraform", "Kubernetes", "Ansible", "Cloud Infrastructure", "Cost Optimization"]
    },
    {
      title: "Software Developer (Freelance)",
      company: "Midtown Drywall Ltd.",
      period: "May 2023 – August 2023",
      location: "Freelance",
      description: [
        "Spearheaded the development of a sophisticated, full-stack application for prefabricated drywall ordering, featuring a high-performance Golang backend, an intuitive jQuery-based frontend, and secure SQLite database management",
        "Augmented the core application with a custom Python Flask API server, enabling seamless data integration with Power BI for advanced analytics",
        "Embedded Power BI dashboards directly into the application, providing real-time data visualization and actionable insights, transforming raw data into a powerful tool for business optimization"
      ],
      technologies: ["Golang", "Python", "Flask", "jQuery", "SQLite", "Power BI"]
    }
  ];
</script>

<section class="py-20 bg-main">
  <div class="max-w-6xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-main mb-4">Professional Experience</h2>
      <p class="text-xl text-main max-w-3xl mx-auto">
        My journey in software development and infrastructure engineering, from freelance projects 
        to enterprise-level solutions at IBM.
      </p>
    </div>

    <div class="space-y-8">
      {#each experiences as experience}
        <Card class="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader class="bg-secondary">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle class="text-xl text-main mb-1">{experience.title}</CardTitle>
                <CardDescription class="text-lg font-medium text-primary mb-1">
                  {experience.company}
                </CardDescription>
                <p class="text-sm text-main">{experience.location}</p>
              </div>
              <div class="mt-2 md:mt-0 md:text-right">
                <span class="inline-block px-3 py-1 bg-primary text-main rounded-full text-sm font-medium">
                  {experience.period}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent class="pt-6">
            <ul class="space-y-3 mb-6">
              {#each experience.description as point}
                <li class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <p class="text-main leading-relaxed">{point}</p>
                </li>
              {/each}
            </ul>
            <div class="flex flex-wrap gap-2">
              {#each experience.technologies as tech}
                <span class="px-3 py-1 bg-secondary text-main rounded-full text-sm font-medium">
                  {tech}
                </span>
              {/each}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</section>
