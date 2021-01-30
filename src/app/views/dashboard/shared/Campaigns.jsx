import React from "react";

import { SimpleCard, MatxProgressBar } from "matx";
import { numFormatter } from "utils";

const Campaigns = ({ campaignsStats }) => {
  const campaignsStatsPerYear =
    campaignsStats && campaignsStats.length > 0
      ? campaignsStats.reduce((accumulator, currentValue) => {
          if (accumulator.find((c) => c.year === parseInt(currentValue.year))) {
            const yearData = accumulator.filter(
              (c) => c.year === parseInt(currentValue.year)
            );
            yearData[0].data.push({
              name: currentValue.name,
              total: parseFloat(currentValue.total),
            });
          } else {
            const data = [];
            data.push({
              name: currentValue.name,
              total: parseFloat(currentValue.total),
            });
            accumulator.push({ year: parseInt(currentValue.year), data: data });
          }

          return accumulator;
        }, [])
      : [];

  const data = campaignsStatsPerYear.map((c) => {
    const totalCampaignsThisYear = c.data.reduce(
      (accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.total);
      },
      0
    );

    const result = { year: c.year };
    result.data = c.data.map((c2) => {
      const percent = parseFloat(
        ((parseFloat(c2.total) * 100) / totalCampaignsThisYear).toFixed(2)
      );

      return { percent: percent, name: c2.name, value: numFormatter(c2.total) };
    });

    return result;
  });

  return (
    <div>
      <SimpleCard title="Campaigns">
        {data.map((c, index) => (
          <div key={index}>
            <small className="text-muted">{c.year}</small>
            <div className="pt-8" />
            {c.data.map((c2, index2) => (
              <div key={index2}>
                <MatxProgressBar
                  value={c2.percent}
                  color="primary"
                  text={`${c2.name} ($${c2.value})`}
                />
                <div className="py-4" />
              </div>
            ))}
            <div className="py-8" />
          </div>
        ))}
      </SimpleCard>
    </div>
  );
};

export default Campaigns;
