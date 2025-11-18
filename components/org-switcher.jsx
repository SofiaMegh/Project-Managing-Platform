"use client"

import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react'

const OrgSwitcher = () => {
    const { isLoaded } = useOrganization();
    const { isLoaded: isUserLoaded } = useUser();
    const pathname = usePathname();

    if (!isLoaded || !isUserLoaded) {
        return null;
    }

    return (
        <div>
          <SignedIn>
            <OrganizationSwitcher 
              hidePersonal
              afterCreateOrganizationUrl={(org) => `/organization/${org.slug}`}
              afterSelectOrganizationUrl={(org) => `/organization/${org.slug}`}
              createOrganizationMode={
                pathname === "/onboarding" ? "navigation" : "modal"
              }
              createOrganizationUrl="/onboarding"
              appearance={{
                elements: {
                  organizationSwitcherTrigger: "border border-red-600 rounded-md px-8 py-4",
                  organizationSwitcherTriggerIcon: "text-red",
                },
              }}
            />
          </SignedIn>
        </div>
      )
}

export default OrgSwitcher
