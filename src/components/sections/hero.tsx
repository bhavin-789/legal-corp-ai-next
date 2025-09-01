"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  FileText,
  ChevronRight,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useIntl } from "react-intl";

const trustAnchors = [
  { icon: Shield, text: "safeConfidential" },
  { icon: Users, text: "designedFOrLawyers" },
  { icon: FileText, text: "profLegalDocs" },
];

export function Hero() {
  const [email, setEmail] = useState("");
  const intl = useIntl();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container-default px-4 py-16 md:py-24 lg:py-32">
        <div className="py-[96px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {intl.formatMessage({ id: "home.hero.new20Tag" })}
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {intl.formatMessage({ id: "home.hero.title" })}
                  {/* <span className="text-primary block"> Bol</span> */}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  {intl.formatMessage({ id: "home.hero.description" })}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/signup">
                  {intl.formatMessage({ id: "home.hero.getStartedButton" })}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                  asChild
                  >
                  <Link href="/pricing">
                  {intl.formatMessage({ id: "home.hero.seePricesButton" })}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust Anchors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {trustAnchors.map((anchor, index) => (
                  <Card key={index} className="bg-background border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <anchor.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">
                          {intl.formatMessage({ id: `home.hero.${anchor.text}` })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main Card */}
              <Card className="relative z-10 shadow-2xl border-border/50 bg-background/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Chat Header */}
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{intl.formatMessage({ id: "home.hero.demoChat.chatTitle" })}</h3>
                        <p className="text-sm text-muted-foreground">
                        {intl.formatMessage({ id: "home.hero.demoChat.lawName" })}
                        </p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                          {intl.formatMessage({ id: "home.hero.demoChat.userPrompt" })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                          {intl.formatMessage({ id: "home.hero.demoChat.botAnswer" })}
                          </p>
                        </div>
                      </div>

                      {/* Document Preview */}
                      <Card className="bg-muted/30 border-dashed">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                          {intl.formatMessage({ id: "home.hero.demoChat.generatedContract" })}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-muted rounded w-full" />
                            <div className="h-2 bg-muted rounded w-5/6" />
                            <div className="h-2 bg-muted rounded w-4/6" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
