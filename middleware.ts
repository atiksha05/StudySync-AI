import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_COOKIE, isValidDemoMode } from "@/lib/demo-preview-shared";

const protectedPrefixes = [
  "/dashboard",
  "/upload",
  "/workspace",
  "/library",
  "/search",
  "/ask",
  "/tasks",
  "/analytics",
  "/settings",
  "/lectures",
  "/onboarding",
  "/companies",
  "/company",
  "/applications",
  "/interview-prep",
  "/resume-tracker",
  "/behavioral-practice",
  "/technical-practice",
  "/networking",
];

const appPrefixes = [
  "/dashboard",
  "/upload",
  "/workspace",
  "/library",
  "/search",
  "/ask",
  "/tasks",
  "/analytics",
  "/settings",
  "/companies",
  "/company",
  "/applications",
  "/interview-prep",
  "/resume-tracker",
  "/behavioral-practice",
  "/technical-practice",
  "/networking",
];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user = authUser;
  } catch {
    user = null;
  }

  const { pathname } = request.nextUrl;
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isOnboarding = pathname.startsWith("/onboarding");

  if (pathname === "/lectures/new") {
    const url = request.nextUrl.clone();
    url.pathname = "/upload";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/lectures/") && pathname !== "/lectures/new") {
    const id = pathname.split("/")[2];
    if (id) {
      const url = request.nextUrl.clone();
      url.pathname = `/workspace/${id}`;
      return NextResponse.redirect(url);
    }
  }

  const demoMode = request.cookies.get(DEMO_COOKIE)?.value;
  const hasDemoAccess = isValidDemoMode(demoMode);

  // Local demo preview: allow app routes without a real Supabase session
  if (!user && hasDemoAccess && appPrefixes.some((p) => pathname.startsWith(p))) {
    return supabaseResponse;
  }

  if (!user && isProtected && !isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Demo users hitting onboarding → send to dashboard
  if (!user && hasDemoAccess && isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (user) {
    let onboardingComplete = false;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed, user_mode")
        .eq("id", user.id)
        .maybeSingle();

      onboardingComplete = !!(
        profile?.onboarding_completed && profile?.user_mode
      );
    } catch {
      onboardingComplete = false;
    }

    if (
      !onboardingComplete &&
      !isOnboarding &&
      appPrefixes.some((p) => pathname.startsWith(p))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    if (onboardingComplete && isOnboarding) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = onboardingComplete ? "/dashboard" : "/onboarding";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload/:path*",
    "/workspace/:path*",
    "/library/:path*",
    "/search/:path*",
    "/ask/:path*",
    "/tasks/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/lectures/:path*",
    "/companies/:path*",
    "/company/:path*",
    "/applications/:path*",
    "/interview-prep/:path*",
    "/resume-tracker/:path*",
    "/behavioral-practice/:path*",
    "/technical-practice/:path*",
    "/networking/:path*",
    "/onboarding",
    "/login",
    "/signup",
  ],
};
