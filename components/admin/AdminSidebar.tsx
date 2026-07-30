"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  FileText,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Tags,
  Users,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/(admin)/admin/actions";
import { Monogram } from "@/components/ui/Logo";
import { RoleBadge } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/tags", label: "Tags", icon: Tags },
] as const;

const adminOnlyLinks = [{ href: "/admin/users", label: "Users", icon: Users }] as const;

export function AdminSidebar({
  user,
}: {
  user: { name: string; email: string; role: "admin" | "editor" };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const nav = [...links, ...(user.role === "admin" ? adminOnlyLinks : [])];

  const navList = (
    <nav className="space-y-1">
      {nav.map(({ href, label, icon: Icon, ...rest }) => {
        const active = isActive(href, "exact" in rest ? rest.exact : undefined);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-200",
              active
                ? "bg-coral/10 font-medium text-coral"
                : "text-cream-dim hover:bg-ink-soft/60 hover:text-cream",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="space-y-3 border-t border-cream-line pt-5">
      <div className="px-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-cream">{user.name}</p>
          <RoleBadge role={user.role} />
        </div>
        <p className="mt-0.5 truncate text-xs text-cream-faint">{user.email}</p>
      </div>

      <Link
        href="/admin/settings"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm text-cream-dim transition-colors hover:bg-ink-soft/60 hover:text-cream"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>

      <a
        href="/blog"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm text-cream-dim transition-colors hover:bg-ink-soft/60 hover:text-cream"
      >
        <ExternalLink className="h-4 w-4" />
        View blog
      </a>

      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm text-cream-dim transition-colors hover:bg-coral/10 hover:text-coral"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-cream-line bg-ink-deep px-5 py-3.5 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Monogram className="h-7 w-auto" />
          <span className="display text-sm">Blog admin</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-lg p-2 text-cream-dim transition-colors hover:bg-ink-soft hover:text-cream"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-cream-line bg-ink-deep px-5 py-5 lg:hidden">
          {navList}
          <div className="mt-5">{footer}</div>
        </div>
      )}

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-cream-line bg-ink-deep px-5 py-7 lg:flex">
        <div>
          <Link href="/admin" className="mb-9 flex items-center gap-2.5 px-1">
            <Monogram className="h-8 w-auto" />
            <span className="display text-sm leading-tight">
              Blog
              <br />
              admin
            </span>
          </Link>
          {navList}
        </div>
        {footer}
      </aside>
    </>
  );
}
