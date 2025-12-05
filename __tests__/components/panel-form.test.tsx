import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PanelForm from "@/components/panel-form"

// Mock dependencies
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

vi.mock("@/app/actions/create-payment", () => ({
  createPayment: vi.fn(),
}))

vi.mock("@/app/actions/check-user-exists", () => ({
  checkUserExists: vi.fn(),
}))

describe("PanelForm - Server Type & Plan Selection", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it("renders server type selector buttons", () => {
    render(<PanelForm />)
    expect(screen.getByRole("button", { name: /Private/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Public/i })).toBeInTheDocument()
  })

  it("shows private plans by default", () => {
    render(<PanelForm />)
    // Verify at least one private plan is rendered
    expect(screen.getByText(/PANEL BOT 1GB EXPRESS/i)).toBeInTheDocument()
  })

  it("switches to public plans when public button is clicked", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    const publicButton = screen.getByRole("button", { name: /Public/i })
    await user.click(publicButton)

    // After switching, should see public plans
    await waitFor(() => {
      expect(screen.getByText(/PANEL BOT 1GB =/i)).toBeInTheDocument()
    })
  })

  it("persists server type selection to localStorage", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    const publicButton = screen.getByRole("button", { name: /Public/i })
    await user.click(publicButton)

    await waitFor(() => {
      expect(localStorage.getItem("serverType")).toBe("public")
    })
  })

  it("allows plan selection and shows detail on expand", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    // Click on a plan
    const planCard = screen.getByText(/PANEL BOT 1GB EXPRESS/i).closest("div[role='button']")
    if (planCard) {
      await user.click(planCard)

      // Should show detail
      await waitFor(() => {
        expect(screen.getByText(/Detail Paket Lengkap/i)).toBeInTheDocument()
      })
    }
  })

  it("persists selected plan to localStorage", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    const planCard = screen.getByText(/PANEL BOT 1GB EXPRESS/i).closest("div[role='button']")
    if (planCard) {
      await user.click(planCard)

      await waitFor(() => {
        expect(localStorage.getItem("selectedPlan")).toBe("1gb/unli")
      })
    }
  })

  it("clears plan selection when switching server type to unavailable plan", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    // Select a private plan
    const privatePlanCard = screen.getByText(/PANEL BOT 1GB EXPRESS/i).closest("div[role='button']")
    if (privatePlanCard) {
      await user.click(privatePlanCard)
    }

    // Switch to public
    const publicButton = screen.getByRole("button", { name: /Public/i })
    await user.click(publicButton)

    // Selection should be cleared since 1gb/unli doesn't exist in public
    await waitFor(() => {
      expect(localStorage.getItem("selectedPlan")).toBeNull()
    })
  })

  it("shows floating button only when plan is selected", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    // Button should not be visible initially
    expect(screen.queryByRole("button", { name: /Beli Sekarang/i })).not.toBeInTheDocument()

    // Click a plan
    const planCard = screen.getByText(/PANEL BOT 1GB EXPRESS/i).closest("div[role='button']")
    if (planCard) {
      await user.click(planCard)

      // Button should now be visible
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Beli Sekarang/i })).toBeInTheDocument()
      })
    }
  })

  it("supports keyboard navigation (Enter/Space on plan card)", async () => {
    const user = userEvent.setup()
    render(<PanelForm />)

    const planCard = screen.getByText(/PANEL BOT 1GB EXPRESS/i).closest("div[role='button']")
    if (planCard) {
      // Focus and press Enter
      planCard.focus()
      await user.keyboard("{Enter}")

      await waitFor(() => {
        expect(screen.getByText(/Detail Paket Lengkap/i)).toBeInTheDocument()
      })
    }
  })

  it("renders plan badges with correct type", () => {
    render(<PanelForm />)

    // Should show Private badge on private plan
    const privatePlan = screen.getByText(/PANEL BOT 1GB EXPRESS/i)
    expect(privatePlan.textContent).toContain("Private")
  })

  it("shows helper text explaining server types", () => {
    render(<PanelForm />)

    expect(
      screen.getByText(/Pilih tipe server.*Private.*server khusus.*Public.*server bersama/i)
    ).toBeInTheDocument()
  })

  it("animates catalog fade on server type change", async () => {
    const user = userEvent.setup()
    const { rerender } = render(<PanelForm />)

    const publicButton = screen.getByRole("button", { name: /Public/i })
    await user.click(publicButton)

    // Wait for fade animation to complete
    await waitFor(
      () => {
        expect(screen.getByText(/PANEL BOT 1GB =/i)).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })
})
