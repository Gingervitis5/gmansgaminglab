import React from 'react'

const PrivacyPage = () => {
   return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-shop_light_blue tracking-wide">
      <h1 className="text-4xl font-extralight mb-8">Privacy Policy</h1>
      
      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">1. Introduction</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        This privacy policy ("policy") will help you understand how GMan's Gaming Lab ("us", "we", 
        "our") uses and protects the data you provide to us when you visit and use our website 
        ("website", "service"). 
        We reserve the right to change this policy at any given time, of which you will be 
        promptly updated. If you want to make sure that you are up to date with the latest 
        changes, we advise you to frequently visit this page.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">2. Data Collection</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        We may collect personal information such as:
        <ul className="list-disc list-inside">
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Mailing Address</li>
          <li>IP Address for account creation</li>
          <li>Payment details if you make purchases</li>
        </ul>
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">3. Data Usage</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        We use your data to:
        <ul className="list-disc list-inside">
          <li>Process and fulfill orders</li>
          <li>Provide customer support</li>
          <li>Send promotional emails and updates</li>
          <li>Improve our website and services</li>
        </ul>
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">4. Data Sharing</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        We use Clerk (clerk.com) for user authentication and identity management. Clerk acts as a data processor on our behalf.<br/>
        They may collect and process certain personal information as part of their services.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">5. Legal Basis for Processing</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          We process your personal information based on the following legal grounds:<br />
          Consent: We may process your data with your explicit consent, such as when you sign up for our newsletter or create an account.<br />
          Legal Obligation: We may process your data to comply with legal obligations, such as tax or accounting requirements.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">6. Retention Periods</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
            We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">7. User Rights</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us to do so. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">8. Contact Information</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
          For any questions or concerns regarding this Privacy Policy, please contact us at:
          <br />
          Email: gmansgaminglab@gmail.com
          <br />
        </p>
      </section>
    </div>
  )
}

export default PrivacyPage