"use client";

import { useEffect, useState } from "react";
type FilterKeys = Pick<
  AdvocateType,
  'firstName' | 'lastName' | 'city' | 'degree' | 'specialties' | 'yearsOfExperience'
>;

const TableHeader = ({ children, className = '' }: { children: string; className?: string }) => (
  <th
    scope="col"
    className={classNames(
      'sticky top-0 z-10 border-b bg-[#285e50] px-1 py-3.5 text-left text-sm font-semibold text-white',
      className
    )}
  >
    {children}
  </th>
);

const TableData = ({
  children,
  advocatesLength,
  advocateIdx,
  className = ''
}: {
  children: React.ReactNode;
  advocatesLength: number;
  advocateIdx: number;
  className?: string;
}) => (
  <td
    className={classNames(
      advocateIdx < advocatesLength - 1 ? 'border-b border-gray-200' : '',
      'whitespace-nowrap px-1 py-4 text-sm',
      className
    )}
  >
    {children}
  </td>
);

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6">
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        Solace Advocates
      </h1>
      <div className="flex items-end space-x-2 py-8">
        <div>
          <label className="block" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            className="h-[30px] rounded-md border border-gray-200 px-1 outline-none focus-visible:ring-1 focus-visible:ring-[#285e50] focus-visible:ring-offset-2"
            value={search}
            onChange={onChange}
          />
        </div>
        <button
          className="rounded-md border border-[#285e50] px-2 py-1 text-sm text-[#285e50] outline-none hover:bg-[#285e50]/10 focus-visible:ring-1 focus-visible:ring-[#285e50] focus-visible:ring-offset-2"
          onClick={handleResetSearch}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
              <TableHeader className="rounded-tl-md pl-3">First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>City</TableHeader>
              <TableHeader>Degree</TableHeader>
              <TableHeader>Specialties</TableHeader>
              <TableHeader>Years of Experience</TableHeader>
              <TableHeader className="rounded-tr-md">Phone Number</TableHeader>
                  <TableData
                    advocateIdx={advocateIdx}
                    advocatesLength={filteredAdvocates.length}
                    className="pl-3"
                  >
                    {advocate.firstName}
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    {advocate.lastName}
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    {advocate.city}
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    {advocate.degree}
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    <ul className="list-none">
                      {advocate.specialties.map((s, index) => (
                        <li key={index}>{s}</li>
                      ))}
                    </ul>
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    {advocate.yearsOfExperience}
                  </TableData>
                  <TableData advocateIdx={advocateIdx} advocatesLength={filteredAdvocates.length}>
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </TableData>
    </main>
  );
}
