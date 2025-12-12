"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Globe, Heart, AlertCircle, Brain, Lightbulb, Activity, Zap } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animation"
// Removed other icon imports that are either duplicated or not used in the updates
// const { Card, CardContent, CardDescription, CardHeader, CardTitle } = require('@/components/ui/card')
// const { Button } = require('@/components/ui/button')
// const { Accordion, AccordionItem, AccordionTrigger, AccordionContent } = require('@/components/ui/accordion')
// const { ScrollAnimation } = require('@/components/scroll-animation')
import { Users, BookOpen, Sparkles, Focus, Scale } from "lucide-react" // Added new icons

export default function ResourcesPage() {
  // Changed function name to ResourcesPage to match existing structure
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {/* Header */}
          <ScrollAnimation className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Mental Health Resources</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Access comprehensive information about mental health conditions, coping strategies, and immediate support
              resources. You&apos;re not alone on this journey.
            </p>
          </ScrollAnimation>

          {/* Quick Links - New Section */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <ScrollAnimation delay={0.2}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: Phone, title: "Crisis Support", href: "#crisis", color: "text-red-500" },
                      { icon: BookOpen, title: "Learn More", href: "#conditions", color: "text-primary" },
                      { icon: Users, title: "Find Counselor", href: "/appointments", color: "text-accent-foreground" },
                      { icon: Heart, title: "Self-Care", href: "#self-care", color: "text-pink-500" },
                    ].map((link, index) => (
                      <ScrollAnimation key={index} delay={0.1 * (index + 3)}>
                        <Link
                          href={link.href}
                          className="group block p-6 bg-card border border-border rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                          <link.icon className={`h-8 w-8 ${link.color} mb-3`} />
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {link.title}
                          </h3>
                        </Link>
                      </ScrollAnimation>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Crisis Resources - Priority Section (Updated) */}
          <section id="crisis" className="py-16 md:py-20 bg-gradient-to-b from-red-50/30 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto space-y-12">
                <ScrollAnimation delay={0.3}>
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Crisis Support</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      If you're in crisis, help is available 24/7
                    </p>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.4}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "National Suicide Prevention Lifeline",
                        phone: "988",
                        description: "24/7 free and confidential support",
                      },
                      {
                        title: "Crisis Text Line",
                        phone: "Text HOME to 741741",
                        description: "Free 24/7 support via text",
                      },
                      {
                        title: "SAMHSA National Helpline",
                        phone: "1-800-662-4357",
                        description: "Treatment referral and information",
                      },
                      {
                        title: "Veterans Crisis Line",
                        phone: "1-800-273-8255 (Press 1)",
                        description: "Support for veterans and their families",
                      },
                    ].map((resource, index) => (
                      <ScrollAnimation key={index} delay={0.1 * (index + 5)}>
                        <div className="p-6 bg-card border border-red-200 rounded-xl hover:shadow-lg transition-all">
                          <h3 className="font-bold text-xl text-foreground mb-2">{resource.title}</h3>
                          <p className="text-2xl font-bold text-red-600 mb-2">{resource.phone}</p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Mental Health Conditions with Accordion (Updated) */}
          <section id="conditions" className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto space-y-12">
                <ScrollAnimation delay={0.2}>
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Understanding Mental Health</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Learn about common mental health conditions, their symptoms, and effective treatment strategies
                    </p>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.3}>
                  <Accordion type="single" collapsible className="space-y-6">
                    {/* Depression */}
                    <AccordionItem
                      value="depression"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors" cursor-pointer="true">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Heart className="h-7 w-7 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1" >
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground" >
                              Depression (Major Depressive Disorder)
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Click to learn about symptoms and relief strategies
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            Depression is more than just feeling sad. It&apos;s a persistent mood disorder that affects
                            how you think, feel, and handle daily activities. With proper treatment, people with
                            depression can lead fulfilling lives.
                          </p>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-accent-foreground" />
                              Common Symptoms
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Persistent sadness, emptiness, or hopelessness",
                                "Loss of interest in activities once enjoyed",
                                "Changes in appetite and weight",
                                "Sleep disturbances (insomnia or oversleeping)",
                                "Fatigue and lack of energy",
                                "Difficulty concentrating or making decisions",
                                "Feelings of worthlessness or excessive guilt",
                                "Physical aches and pains without clear cause",
                                "Thoughts of death or suicide",
                              ].map((symptom, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-muted-foreground">{symptom}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Cognitive Behavioral Therapy (CBT)",
                                "Antidepressant medications (SSRIs, SNRIs)",
                                "Regular exercise (30 minutes daily)",
                                "Maintaining consistent sleep schedule",
                                "Social connection and support groups",
                                "Mindfulness and meditation practices",
                                "Light therapy (for seasonal depression)",
                                "Journaling thoughts and feelings",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Connect with a Counselor</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Anxiety Disorders */}
                    <AccordionItem
                      value="anxiety"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-accent/20 rounded-lg">
                            <Zap className="h-7 w-7 text-accent-foreground" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Anxiety Disorders</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Including GAD, panic disorder, and social anxiety
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            Anxiety disorders are characterized by excessive worry, fear, or nervousness that interferes
                            with daily activities. They are among the most common mental health conditions, affecting
                            millions of people worldwide.
                          </p>

                          <div className="space-y-6">
                            {/* GAD */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Zap className="h-5 w-5 text-accent-foreground" />
                                Generalized Anxiety Disorder (GAD)
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Excessive worry about various topics",
                                  "Restlessness or feeling on edge",
                                  "Fatigue and difficulty concentrating",
                                  "Irritability and muscle tension",
                                  "Sleep problems",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Panic Disorder */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-accent-foreground" />
                                Panic Disorder
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Sudden panic attacks with rapid heartbeat",
                                  "Sweating, trembling, and shortness of breath",
                                  "Chest pain and nausea",
                                  "Fear of losing control or dying",
                                  "Chills or hot flashes",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Social Anxiety */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Heart className="h-5 w-5 text-accent-foreground" />
                                Social Anxiety Disorder
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Intense fear of social situations",
                                  "Fear of judgment or embarrassment",
                                  "Avoidance of social interactions",
                                  "Physical symptoms in social settings (blushing, sweating)",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Deep breathing exercises (4-7-8 technique, box breathing)",
                                "Progressive muscle relaxation",
                                "Exposure therapy and Cognitive Behavioral Therapy",
                                "Anti-anxiety medications (benzodiazepines, SSRIs)",
                                "Grounding techniques (5-4-3-2-1 method)",
                                "Regular exercise and yoga",
                                "Limiting caffeine and alcohol",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Find Support</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Bipolar Disorder */}
                    <AccordionItem
                      value="bipolar"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <Activity className="h-7 w-7 text-purple-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Bipolar Disorder</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Understanding mood episodes and management
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            Bipolar disorder involves extreme mood swings that include emotional highs (mania or
                            hypomania) and lows (depression). These mood shifts can affect sleep, energy, activity,
                            judgment, behavior, and the ability to think clearly.
                          </p>

                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Zap className="h-5 w-5 text-accent-foreground" />
                                Symptoms of Manic Episodes
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Abnormally upbeat, jumpy, or wired",
                                  "Increased activity, energy, or agitation",
                                  "Exaggerated sense of well-being and self-confidence",
                                  "Decreased need for sleep",
                                  "Unusual talkativeness and racing thoughts",
                                  "Distractibility and poor decision-making",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Heart className="h-5 w-5 text-accent-foreground" />
                                Symptoms of Depressive Episodes
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Depressed mood and loss of interest",
                                  "Significant weight loss or gain",
                                  "Insomnia or sleeping too much",
                                  "Restlessness or slowed behavior",
                                  "Fatigue and loss of energy",
                                  "Feelings of worthlessness or guilt",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Mood stabilizing medications (lithium, valproate)",
                                "Psychotherapy (CBT, family-focused therapy)",
                                "Maintaining regular sleep schedule",
                                "Mood tracking and early warning signs",
                                "Avoiding drugs and alcohol",
                                "Building a support network",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Get Professional Help</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* PTSD */}
                    <AccordionItem
                      value="ptsd"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <AlertCircle className="h-7 w-7 text-orange-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                              Post-Traumatic Stress Disorder (PTSD)
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Healing from trauma and managing symptoms
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            PTSD can develop after exposure to a traumatic event. It&apos;s characterized by intrusive
                            memories, avoidance, negative changes in thinking and mood, and changes in physical and
                            emotional reactions.
                          </p>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-accent-foreground" />
                              Common Symptoms
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Intrusive memories and flashbacks",
                                "Nightmares about the traumatic event",
                                "Severe emotional distress or physical reactions",
                                "Avoiding thoughts or places related to trauma",
                                "Negative thoughts about self or others",
                                "Feeling emotionally numb",
                                "Difficulty maintaining close relationships",
                                "Being easily startled or frightened",
                                "Self-destructive behavior",
                              ].map((symptom, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-muted-foreground">{symptom}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Trauma-focused Cognitive Behavioral Therapy",
                                "Eye Movement Desensitization and Reprocessing (EMDR)",
                                "Prolonged Exposure Therapy",
                                "Medications (SSRIs, prazosin for nightmares)",
                                "Grounding techniques for flashbacks",
                                "Support groups with other survivors",
                                "Stress management and relaxation techniques",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Connect with a Trauma Specialist</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* OCD */}
                    <AccordionItem
                      value="ocd"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Sparkles className="h-7 w-7 text-blue-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                              Obsessive-Compulsive Disorder (OCD)
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Managing intrusive thoughts and compulsive behaviors
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            OCD is characterized by unreasonable thoughts and fears (obsessions) that lead to compulsive
                            behaviors. These obsessions and compulsions interfere with daily activities and cause
                            significant distress.
                          </p>

                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Brain className="h-5 w-5 text-accent-foreground" />
                                Common Obsessions
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Fear of contamination or dirt",
                                  "Doubting and difficulty tolerating uncertainty",
                                  "Needing things orderly and symmetrical",
                                  "Aggressive or horrific thoughts",
                                  "Unwanted thoughts about harm or taboo subjects",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Activity className="h-5 w-5 text-accent-foreground" />
                                Common Compulsions
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Excessive cleaning or handwashing",
                                  "Ordering and arranging things in a particular way",
                                  "Repeatedly checking things",
                                  "Compulsive counting",
                                  "Following a strict routine",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Exposure and Response Prevention (ERP) therapy",
                                "Cognitive Behavioral Therapy (CBT)",
                                "Medications (SSRIs, clomipramine)",
                                "Mindfulness and acceptance techniques",
                                "Support groups for OCD",
                                "Stress management strategies",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Find an OCD Specialist</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ADHD */}
                    <AccordionItem
                      value="adhd"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Focus className="h-7 w-7 text-green-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                              Attention-Deficit/Hyperactivity Disorder (ADHD)
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Understanding focus, impulse control, and hyperactivity
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            ADHD is one of the most common neurodevelopmental disorders of childhood, though it often
                            continues into adulthood. It&apos;s characterized by inattention, hyperactivity, and
                            impulsivity.
                          </p>

                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Brain className="h-5 w-5 text-accent-foreground" />
                                Symptoms of Inattention
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Difficulty paying attention to details",
                                  "Trouble staying focused on tasks",
                                  "Seems not to listen when spoken to",
                                  "Fails to follow through on instructions",
                                  "Difficulty organizing tasks and activities",
                                  "Avoids tasks requiring sustained mental effort",
                                  "Loses things necessary for tasks",
                                  "Easily distracted",
                                  "Forgetful in daily activities",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Zap className="h-5 w-5 text-accent-foreground" />
                                Symptoms of Hyperactivity-Impulsivity
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Fidgets with or taps hands or feet",
                                  "Leaves seat in situations when remaining seated is expected",
                                  "Runs about or climbs in inappropriate situations",
                                  "Unable to engage in activities quietly",
                                  "On the go or acts as if driven by a motor",
                                  "Talks excessively",
                                  "Blurts out answers before questions are completed",
                                  "Has trouble waiting their turn",
                                  "Interrupts or intrudes on others",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Stimulant medications (methylphenidate, amphetamines)",
                                "Non-stimulant medications (atomoxetine, guanfacine)",
                                "Behavioral therapy and parent training",
                                "Creating structured routines and schedules",
                                "Breaking tasks into smaller steps",
                                "Using planners and organizational tools",
                                "Regular exercise to manage symptoms",
                                "Minimizing distractions in work/study areas",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Get ADHD Support</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Eating Disorders */}
                    <AccordionItem
                      value="eating-disorders"
                      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card"
                    >
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="p-3 bg-pink-100 rounded-lg">
                            <Scale className="h-7 w-7 text-pink-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Eating Disorders</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Including anorexia, bulimia, and binge eating disorder
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 bg-card">
                        <div className="space-y-8">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            Eating disorders are serious conditions related to persistent eating behaviors that
                            negatively impact health, emotions, and ability to function in important areas of life.
                          </p>

                          <div className="space-y-6">
                            {/* Anorexia */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-accent-foreground" />
                                Anorexia Nervosa
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Extremely restricted eating",
                                  "Intense fear of gaining weight",
                                  "Distorted body image",
                                  "Extremely low body weight",
                                  "Relentless pursuit of thinness",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Bulimia */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Brain className="h-5 w-5 text-accent-foreground" />
                                Bulimia Nervosa
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Recurrent episodes of binge eating",
                                  "Compensatory behaviors (purging, excessive exercise)",
                                  "Self-evaluation unduly influenced by body shape",
                                  "Feeling lack of control during binges",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Binge Eating */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                                <Activity className="h-5 w-5 text-accent-foreground" />
                                Binge Eating Disorder
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {[
                                  "Eating large quantities of food in short periods",
                                  "Feeling lack of control over eating",
                                  "Eating when not hungry or past fullness",
                                  "Eating alone due to embarrassment",
                                  "Feeling disgusted, depressed, or guilty after",
                                ].map((symptom, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{symptom}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-xl text-foreground flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent-foreground" />
                              Relief Strategies
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                "Psychotherapy (CBT, DBT, family-based therapy)",
                                "Nutritional counseling and meal planning",
                                "Medical monitoring and treatment",
                                "Medications (antidepressants for some disorders)",
                                "Support groups and peer support",
                                "Treatment of co-occurring conditions",
                                "Developing healthy coping mechanisms",
                              ].map((strategy, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-accent/30 rounded-lg">
                                  <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground">{strategy}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto btn-animate" asChild>
                            <Link href="/appointments">Find an Eating Disorder Specialist</Link>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <ScrollAnimation delay={200}>
            <section className="space-y-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Additional Resources</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                  More helpful resources and organizations dedicated to mental health support
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-animate hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-6 w-6 text-primary" />
                      Mental Health America
                    </CardTitle>
                    <CardDescription>Tools, information, and resources for mental wellness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full btn-animate bg-transparent" asChild>
                      <a href="https://mhanational.org" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-animate hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-6 w-6 text-primary" />
                      National Alliance on Mental Illness
                    </CardTitle>
                    <CardDescription>Education, advocacy, and support communities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full btn-animate bg-transparent" asChild>
                      <a href="https://nami.org" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
