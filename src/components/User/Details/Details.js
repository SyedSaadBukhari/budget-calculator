import React from "react";

const Details = ({ user }) => {
  if (!user) return null;

  const DetailItem = ({ label, value }) => (
    <div className="mb-4">
      <dt className="text-sm font-medium text-gray-700 mb-1">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  );

  return (
    <section className="bg-white rounded-lg overflow-hidden mb-6">
      <header className="bg-gray-50 px-6 py-3">
        <h2 className="text-lg font-medium text-gray-900">Personal Details</h2>
      </header>
      <main className="px-6 py-4">
        <dl className="grid grid-cols-2 gap-6">
          <div>
            <DetailItem
              label="Full Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <DetailItem label="Gender" value={user.gender} />
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Education" value={user.education} />
            <DetailItem label="Address" value={user.completeAddress} />
          </div>

          <div>
            <DetailItem label="Father Name" value={user.fatherName} />
            <DetailItem label="Phone" value={user.phoneNumber} />
            <DetailItem label="Zip Code" value={user.zipCode} />
            <DetailItem label="Date of Birth" value={user.dateOfBirth} />
            <DetailItem label="Budget Limit" value={user.budgetLimit} />
          </div>
        </dl>
      </main>
    </section>
  );
};

export default Details;
