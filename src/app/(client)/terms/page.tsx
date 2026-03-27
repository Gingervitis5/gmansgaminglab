import Link from 'next/link'
import React from 'react'

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-shop_light_blue tracking-wide">
      <h1 className="text-4xl font-extralight mb-8">Terms and Conditions</h1>
      
      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">1. Conditions of Use</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        By using this website, you certify that you have read and reviewed this Agreement and 
        that you agree to comply with its terms. If you do not want to be bound by the terms of 
        this Agreement, you are advised to stop using the website accordingly. GMan's Gaming Lab 
        only grants use and access of this website, its products, and its services to those who 
        have accepted its terms. 
        You certify that you are over the age of 18 and are fully able and competent to enter into the 
        terms, conditions, obligations, affirmations, representations, and warranties set forth in this 
        Agreement, and to abide by and comply with this Agreement.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">2. Privacy Policy</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          Before you continue using our website, we advise you to read our privacy 
          policy <Link href="/privacy" className="text-shop_light_blue underline">here</Link> regarding 
          our user data collection. It will help you better understand our practices.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">3. Intellectual Property</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          You agree that all materials, products, and services provided on this website are the 
        property of GMan's Gaming Lab, its affiliates, directors, officers, employees, agents, 
        suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and 
        other intellectual property. You also agree that you will not reproduce or redistribute the 
        GMan's Gaming Lab's intellectual property in any way, including electronic, digital, or new 
        trademark registrations. You will not use any of the intellectual property for commercial purposes, 
        or for any public display (commercial or non-commercial), without express written permission from GMan's Gaming Lab. 
        If you use any of the intellectual property in violation of this agreement, your right to use the website will terminate 
        immediately and you should destroy all copies of any of the materials.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">4. User Accounts and Security</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          As a user of this website, you may be asked to register with us and provide private 
        information. You are responsible for ensuring the accuracy of this information, and you 
        are responsible for maintaining the safety and security of your identifying information. 
        You are also responsible for all activities that occur under your account or password. 
        If you think there are any possible issues regarding the security of your account on the 
        website, inform us immediately so we may address them accordingly. 
        We reserve all rights to terminate accounts, edit or remove content and cancel orders at 
        our sole discretion.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">5. Indemnification</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          You agree to indemnify GMan's Gaming Lab and its affiliates and hold GMan's Gaming Lab 
        harmless against legal claims and demands that may arise from your use or misuse of 
        our services. We reserve the right to select our own legal counsel.  
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">6. Limitation on Liability</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          GMan's Gaming Lab is not liable for any damages that may occur to you as a result of your 
        misuse of our website. 
        GMan's Gaming Lab reserves the right to edit, modify, and change this Agreement at any 
        time. We shall let our users know of these changes through electronic mail. This 
        Agreement is an understanding between GMan's Gaming Lab and the user, and this 
        supersedes and replaces all prior agreements regarding the use of this website. 
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">7. Modifications</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          GMan's Gaming Lab reserves the right to modify or update these Terms at any time. 
          Any changes will be effective immediately upon posting on the website. 
          It is your responsibility to review these Terms periodically for any updates. 
          Your continued use of the website after any modifications constitutes your acceptance of the revised Terms.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">8. Governing Law</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which GMan's Gaming Lab operates, without regard to its conflict of law principles.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">9. Contact Information</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          For any questions or concerns regarding these Terms, please contact us at:
          <br />
          Email: support@gmansgaminglab.com
          <br />
        </p>
      </section>
    </div>
  )
}

export default TermsPage