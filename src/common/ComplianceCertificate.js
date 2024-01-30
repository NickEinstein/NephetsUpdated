/* eslint-disable max-len */
import { Avatar, Typography } from "@mui/material";
import LoginAPi from "apis/LoginApi";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { RouteEnum } from "constants/RouteConstants";
import edologo from "images/EdoLogo.svg";
import edologo2 from "images/Screenshot 2023-11-06 at 12.34 1.svg";
import moment from "moment";

const ProcurementDocument = ({ procurementData }) => {
  const [message, setMessage] = useState("Authenticating...");
  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = LoginAPi.useLoginMutation();

  const redirect = useNavigate();
  // const { emp } = useParams();
  // console.log(emp);
  const location = useLocation();

  // console.log(location.search);

  // const queryParams = queryString.parse(location.search);
  // console.log(queryParams);
  // console.log(window.location);

  // Access individual parameters
  // const searchTerm = queryParams.search;
  // const category = queryParams.category;

  const handleAuthentication = async (emp) => {};
  console.log(procurementData);

  function numberWithCommas(x) {
    return x
      ?.toFixed(2)
      ?.toString()
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function numberToWords(number) {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    function convertChunk(chunk) {
      const num = parseInt(chunk, 10);

      if (num === 0) {
        return "";
      } else if (num < 10) {
        return units[num];
      } else if (num < 20) {
        return teens[num - 10];
      } else {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        return tens[ten] + (unit !== 0 ? " " + units[unit] : "");
      }
    }

    function convertNumberToWords(num) {
      if (num === 0) {
        return "Zero";
      }

      const chunks = [];
      while (num > 0) {
        chunks.push(num % 1000);
        num = Math.floor(num / 1000);
      }

      const wordsChunks = chunks.map((chunk, index) => {
        const words = convertChunk(chunk);
        return index > 0 && words !== ""
          ? words + " " + ["Thousand", "Million", "Billion"][index - 1]
          : words;
      });

      return wordsChunks.reverse().join(" ").trim();
    }

    return convertNumberToWords(number);
  }

  function numberToWords(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function convertLessThanOneThousand(num) {
        if (num === 0) {
            return '';
        } else if (num < 10) {
            return units[num];
        } else if (num < 20) {
            return teens[num - 11];
        } else if (num < 100) {
            return tens[Math.floor(num / 10)] + ' ' + convertLessThanOneThousand(num % 10);
        } else {
            return units[Math.floor(num / 100)] + ' hundred ' + convertLessThanOneThousand(num % 100);
        }
    }

    function convertNumberToWords(num) {
        if (num === 0) {
            return 'zero';
        } else {
            let result = '';
            if (num >= 1_000_000_000) {
                result += convertLessThanOneThousand(Math.floor(num / 1_000_000_000)) + ' billion and ';
                num %= 1_000_000_000;
            }
            if (num >= 1_000_000) {
                result += convertLessThanOneThousand(Math.floor(num / 1_000_000)) + ' million and ';
                num %= 1_000_000;
            }
            if (num >= 1000) {
                result += convertLessThanOneThousand(Math.floor(num / 1000)) + ' thousand and ';
                num %= 1000;
            }
            result += convertLessThanOneThousand(num);
            return result.trim();
        }
    }

    if (number < 0) {
        return 'negative ' + convertNumberToWords(-number);
    } else {
        return convertNumberToWords(number);
    }
}

// Example usage
console.log(numberToWords(123456789123)); // Output: "one hundred twenty-three billion four hundred fifty-six million seven hundred eighty-nine thousand one hundred twenty-three"


  // Example usage:
  // const number = 123456789;
  // const words = numberToWords(number);
  // console.log(`${number} in words: ${words}`);

  return (
    <div className="w-full">
      <div className="w-full  bg-white text-center flex flex-col items-center gap-4 px-[5%] mt-20">
        <Avatar className="h-16 w-16" src={edologo} />
        <div className="flex gap-5">
          <div>
            <div className="flex gap-4 justify-center items-center">
              <Avatar className="w-16 h-16" src={edologo2} />

              <div>
                <Typography
                  variant="h4"
                  className="text-[#3C7E2D] font-bold t"
                >
                  EDO STATE PUBLIC PROCUREMENT AGENCY
                </Typography>
                <Typography className="text-[#D80303] text-lg">
                  Transparency, Accountability & Value For Money
                </Typography>
              </div>
            </div>
            <div class="flex justify-between w-full my-8">
              <div className="">
                <Typography className="font-bold text-left text-lg">
                  {" "}
                  EDPPA/107/Vol.x/xxx
                </Typography>
                <Typography className="text-left text-lg">
                  The Managing Director
                </Typography>
                {/* <Typography className="text-left text-lg">
                  **** *** ******(Agency/MDA)
                </Typography>
                <Typography className="text-left text-lg">
                  *** ***** ******(Address line 1)
                </Typography>
                <Typography className="text-left text-lg">
                  *** **** ****** (Address line 2)
                </Typography> */}
                {/* <Typography>%%Address line 3</Typography> */}
              </div>
              <div className="w-2/6">
                <Typography className="font-bold text-lg text-[#D80303]">
                  Governor’s Office
                </Typography>
                <Typography className="text-lg">
                  8th Floor, Block C, Secretariat Complex, Sapele Road, Benin
                  City, Edo State.{" "}
                  <Typography className="text-lg">
                    {moment(procurementData?.createdAt).format("LL")}
                  </Typography>
                </Typography>
              </div>
            </div>
            <div className="my-16">
              <Typography
                variant="h6"
                className="text-[#3C7E2D] font-bold my-6 text-2xl underline underline-offset-2"
              >
                CERTIFICATION
              </Typography>

              <div className="flex flex-col gap-4">
                <Typography className="text-lg">
                  This is to certify you have complied substantially with the
                  provisions of Edo State Public Procurement Law 2020 in the
                  engagement of{" "}
                  <span className="font-bold">{procurementData?.vendor} </span>{" "}
                  of
                  <span class="font-bold">
                    {" "}
                    {procurementData?.companyAddress}
                  </span>{" "}
                  as a Service Provider for the provision of{" "}
                  <span class="font-bold">
                    {procurementData?.serviceDescription}
                  </span>{" "}
                  on behalf of the Managing Director{" "}
                  <span class="font-bold">{procurementData?.mdaName}</span>{" "}
                  Benin-City.
                </Typography>
                <Typography className="text-lg">
                  2. Consequently, the Edo State Public Procurement Agency has
                  no objection to the formal engagement of{" "}
                  <span class="font-bold">{procurementData?.vendor}</span> for a
                  lump-Sum Service Contract with a{" "}
                  <span class="font-bold">
                    {numberToWords(
                      isNaN(procurementData?.projectDuration)
                        ? 1
                        : procurementData?.projectDuration
                    )}{" "}
                    (
                    {isNaN(procurementData?.projectDuration)
                      ? 1
                      : procurementData?.projectDuration}
                    ) Year Duration {" "}
                  </span>
                  at a contract value of
                  <span class="font-bold"> {" "}
                    &#8358;{numberWithCommas(procurementData?.costImplication)}{" "}
                    ({numberToWords(procurementData?.costImplication)} Naira
                    Only).
                  </span>
                </Typography>
                <Typography className="text-lg">
                  3.Copies of this certificate are being forwarded to the state
                  Accountant General and State Auditor General for their
                  Information and further neccessary action
                </Typography>
                <div className="mt-5 text-lg text-left">
                  <Typography>
                    CC: Permanant Secretary/Accountatnt General
                  </Typography>
                  <Typography>Office Od the Accountant General</Typography>
                  <Typography>Benin City </Typography>
                </div>

                <div className="mt-3 text-lg text-left">
                  <Typography>Auditor General (State)</Typography>
                  <Typography>Office Of the Auditor General</Typography>
                  <Typography>Benin City </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementDocument;
