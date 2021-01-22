const mockData = [
  {
    title: 'a hard interview question',
    companies: ['facebook', 'linkedin', 'netflix'],
    positions: ['software engineer', 'Business Analyst', 'Data Scientist']
  },
  {
    title: 'easy question to solve',
    companies: ['facebook', 'linkedin', 'amazon', 'google'],
    positions: ['software engineer', 'marketing Analyst', 'Data Scientist', 'ML Engineer']
  }
];

const contains1 = (first, second) => {
  const indexArray = first.map(el => {
    return second.indexOf(el);
  });
  return indexArray.indexOf(-1) === -1;
};

const contains2 = (first, second) => {
  let matchCount = 0;

  //Check if Substrings are found in MainString
  second.forEach((item) => {
    if (first.toLowerCase().includes(item.toLowerCase())) matchCount++;
  });

  return matchCount === second.length;
};

export const fetchSearchResult = ({ searchTerm, company, position }) => {
  return new Promise((resolve) => {
    let data = [...mockData];
    if (searchTerm.length > 0) {
      data = [...data.filter((item) => contains2(item.title, searchTerm))];
    }
    if (company.length > 0) {
      data = [...data.filter((item) => contains1(company, item.companies.map((item) => item.toLowerCase())))];
    }
    if (position.length > 0) {
      data = [...data.filter((item) => contains1(position, item.positions.map((item) => item.toLowerCase())))];
    }

    if (searchTerm.length === 0 && company.length === 0 && position.length === 0) {
      resolve({ data: [] });
    } else {
      resolve({ data });
    }
  })
}
