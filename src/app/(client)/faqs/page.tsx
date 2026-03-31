import React from 'react'

const FAQsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-shop_light_blue tracking-wide">
      <h1 className="text-4xl font-extralight mb-8">Facts and Questions</h1>
      
      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">1. What payment methods do you accept?</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and other popular payment methods. All transactions are securely processed to ensure your information is protected.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">2. How can I track my order?</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        If your order contains physical products, you will receive a shipping confirmation email with a tracking number once your order has been processed and shipped. 
        You can use this tracking number on the carrier's website to monitor the delivery status of your order. If you have any issues with tracking your order, please contact our customer support team for assistance.<br />
        If your order contains digital products, you will receive an email with instructions on how to access your purchase immediately after the order is completed.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">3. What is your return policy?</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        Returns on digital only products are not accepted. If you have an issue with a digital product, please contact our support team for assistance.<br />
        Returns on physical products are accepted within 30 days of delivery. To be eligible for a return, the item must be unused and in the same condition that you received it. It must also be in the original packaging.
        </p>
      </section>
      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-3xl mb-4">4. Do I need to create an account to browse the website?</h2>
        <p className="text-xl text-shop_light_blue leading-relaxed">
        No, you can browse our website and view products without creating an account.<br />
        You do have to create an account if you intend to make a purchase as it allows you to save your information for faster checkout and track your orders more easily.
        </p>
      </section>
    </div>
  )
}

export default FAQsPage