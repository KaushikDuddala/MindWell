import Link from "next/link"
import { Heart, Phone, Mail, MapPin, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold">Voices4Minds</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporting mental health and wellness through compassionate care and community.
            </p>
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/Voices4Minds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/Voices4Minds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/Voices4Minds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground hover:text-primary transition-colors">
                  Find a Counselor
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources#crisis" className="text-muted-foreground hover:text-primary transition-colors">
                  Crisis Resources
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:1-800-273-8255" className="hover:text-primary transition-colors">
                  1-800-273-8255
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:support@Voices4Minds.org" className="hover:text-primary transition-colors">
                  support@Voices4Minds.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Available nationwide</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://discord.gg/Voices4Minds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Join our Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center space-y-4">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            If you are in crisis or experiencing a mental health emergency, please call the National Suicide Prevention
            Lifeline at{" "}
            <a href="tel:988" className="font-semibold text-primary hover:underline">
              988
            </a>{" "}
            or text &quot;HELLO&quot; to 741741.
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Voices4Minds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
