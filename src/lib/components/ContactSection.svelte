<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  
  let email = "ben.probst@queensu.ca";
  let formData = {
    name: "",
    email: "",
    message: ""
  };
  
  function handleSubmit() {
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    formData = { name: "", email: "", message: "" };
  }
</script>

<section class="py-20 bg-secondary">
  <div class="max-w-4xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-main mb-4">Let's Work Together</h2>
      <p class="text-xl text-main max-w-2xl mx-auto">
        I'm always interested in new opportunities and exciting projects. 
        Let's discuss how we can bring your ideas to life.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact Info -->
      <div>
        <h3 class="text-2xl font-semibold text-main mb-6">Get In Touch</h3>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-main text-sm">Email</p>
              <a href="mailto:{email}" class="text-main font-medium hover:text-primary">
                {email}
              </a>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-main" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.568 8.16c-.14 6.22-2.15 10.4-2.15 10.4s-1.48-3.78-3.42-3.78-3.42 3.78-3.42 3.78-2.01-4.18-2.15-10.4c-.04-1.67.55-3.18 1.58-4.21C8.62 2.79 10.26 2.14 12 2.14s3.38.65 4.01 1.85c1.03 1.03 1.62 2.54 1.57 4.21z"/>
              </svg>
            </div>
            <div>
              <p class="text-main text-sm">GitHub</p>
              <a href="https://github.com/benprobst" target="_blank" rel="noopener noreferrer" class="text-main font-medium hover:text-primary">
                github.com/benprobst
              </a>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-main" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <p class="text-main text-sm">LinkedIn</p>
              <a href="https://linkedin.com/in/ben-probst" target="_blank" rel="noopener noreferrer" class="text-main font-medium hover:text-primary">
                linkedin.com/in/ben-probst
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-main mb-1">Name</label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                class="w-full px-3 py-2 border border-main rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-main mb-1">Email</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full px-3 py-2 border border-main rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-main mb-1">Message</label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="4"
                class="w-full px-3 py-2 border border-main rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
            
            <Button type="submit" class="w-full bg-primary hover:bg-accent">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
