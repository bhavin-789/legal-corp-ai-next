"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  FileText,
  Shield,
  Zap,
  Users,
  Globe,
  MessageSquare,
  Download,
  CheckCircle,
} from "lucide-react";
import { useIntl } from "react-intl";

const features = [
  {
    icon: Bot,
    title: "feature1.title",
    description: "feature1.description",
    badge: "popular",
  },
  {
    icon: FileText,
    title: "feature2.title",
    description: "feature2.description",
    badge: "new",
  },
  {
    icon: Shield,
    title: "feature3.title",
    description: "feature3.description",
  },
  {
    icon: Zap,
    title: "feature4.title",
    description: "feature4.description",
  },
  {
    icon: Users,
    title: "feature5.title",
    description: "feature5.description",
  },
  {
    icon: Globe,
    title: "feature6.title",
    description: "feature6.description",
  },
];

export function Features() {
  const intl = useIntl();
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container-default px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {intl.formatMessage({ id: "home.features.title" })}
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            {intl.formatMessage({ id: "home.features.description" })}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-border/50 hover:shadow-lg transition-shadow"
            >
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {intl.formatMessage({
                      id: `home.features.${feature?.badge}`,
                    })}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    {intl.formatMessage({
                      id: `home.features.${feature?.title}`,
                    })}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {intl.formatMessage({
                    id: `home.features.${feature?.description}`,
                  })}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {intl.formatMessage({
                    id: "home.features.whyChooseSection.title",
                  })}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {intl.formatMessage({
                    id: "home.features.whyChooseSection.description",
                  })}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      {intl.formatMessage({
                        id: "home.features.whyChooseSection.feature1",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      {intl.formatMessage({
                        id: "home.features.whyChooseSection.feature2",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      {intl.formatMessage({
                        id: "home.features.whyChooseSection.feature3",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Download className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
