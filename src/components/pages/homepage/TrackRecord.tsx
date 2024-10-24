import React from 'react';

const benefits = [
  {
    bg: '#FAE9FC',
    borderColor: "#CE18DF",
    title: '100,000+',
    desc: 'Active Users'
  },
  {
    bg: '#FAE9FC',
    borderColor: "#CE18DF",
    title: '$500M',
    desc: 'Transaction Volume'
  },
  {
    bg: '#FAE9FC',
    borderColor: "#CE18DF",
    title: '4.8/5',
    desc: 'Average User rating'
  },
  {
    bg: '#FAE9FC',
    borderColor: "#CE18DF",
    title: '774',
    desc: 'Local Governments Served'
  }
];

function TrackRecord() {
  return (
    <section id="why-us" className="w-full relative overflow- mt-40">
      <div className="w-full index-content">
        <div className="w-full relative pt-20">
          <div className="flex flex-wrap -mx-3">
            {benefits.map((item) => (
              <div className="w-full flex mdx2:w-1/4 p-3" key={item.title}>
                <div
                  style={{ backgroundColor: item?.bg, borderColor: item?.borderColor }}
                  className="w-full h-full max-w-xl mdx2:max-w-[350px] mx-auto p-5 rounded-2xl border border-1"
                >
                  <h3 className="text-3xl ff-medium mb-4">{item.title}</h3>
                  <p className="text-xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackRecord;
