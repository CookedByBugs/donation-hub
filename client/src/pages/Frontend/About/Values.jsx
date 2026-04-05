import React from "react";

const Values = () => {
  const coreValues = [
    {
      title: "Transparency",
      description: "We ensure every donation reaches its intended destination. Transparency is the bedrock of the trust our donors place in us.",
      icon: "🔍"
    },
    {
      title: "Compassion",
      description: "At the heart of everything we do is a deep sense of empathy for communities in need. Kindness drives our platform.",
      icon: "❤️"
    },
    {
      title: "Impact",
      description: "We are outcomes-focused, partnering with established NGOs to make sure that each campaign leads to measurable differences.",
      icon: "📈"
    }
  ];

  return (
    <div className="py-20 bg-nav">
      <div className="md:max-w-[80%] max-w-[95%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">Our Core Values</h2>
          <p className="text-xl text-gray-600 mt-4">The principles that guide our journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4 bg-secondary/20 inline-block p-4 rounded-full">
                {val.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{val.title}</h3>
              <p className="text-gray-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Values;
