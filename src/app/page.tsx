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
  const [advocates, setAdvocates] = useState<AdvocateType[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateType[]>([]);
  const [search, setSearch] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (search === '') {
        setFilteredAdvocates(advocates);
        return;
      }

      const checkAdvocateContainsSearch = (
        advocate: AdvocateType,
        key: keyof FilterKeys
      ): boolean => {
        if (key === 'specialties') {
          return advocate[key].some((specialty) =>
            specialty.toLowerCase().includes(search.toLowerCase())
          );
        } else if (key === 'yearsOfExperience') {
          if (isNaN(Number(search))) {
            return false;
          }
          return advocate[key] === Number(search);
        } else {
          return advocate[key]?.toLowerCase().includes(search.toLowerCase());
        }
      };

      const filteredAdvocates = advocates.filter((advocate) => {
        return (
          checkAdvocateContainsSearch(advocate, 'firstName') ||
          checkAdvocateContainsSearch(advocate, 'lastName') ||
          checkAdvocateContainsSearch(advocate, 'city') ||
          checkAdvocateContainsSearch(advocate, 'degree') ||
          checkAdvocateContainsSearch(advocate, 'specialties') ||
          checkAdvocateContainsSearch(advocate, 'yearsOfExperience')
        );
      });

      setFilteredAdvocates(filteredAdvocates);
    }, 500);
  }, [search, advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleResetSearch = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSearch('');
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
      <div className="flow-root">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <TableHeader className="rounded-tl-md pl-3">First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>City</TableHeader>
              <TableHeader>Degree</TableHeader>
              <TableHeader>Specialties</TableHeader>
              <TableHeader>Years of Experience</TableHeader>
              <TableHeader className="rounded-tr-md">Phone Number</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredAdvocates.map((advocate, advocateIdx) => {
              return (
                <tr className="border-b border-gray-500" key={advocate.id}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
