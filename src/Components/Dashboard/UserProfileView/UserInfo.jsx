import React from "react";

const UserInfo = ({ publicProfileData }) => {
  return (
    <div
      class="tab-pane fade active show"
      id="contact"
      role="tabpanel"
      aria-labelledby="contact-tab"
    >
      <div class="card">
        <div class="card-content">
          <div class="table-responsive">
            <table class="table table-match bordered hide-on-small-only">
              <thead>
                <tr>
                  <th style={{ width: "45%" }}>Type</th>
                  <th colspan="2" class="right-align">
                    Match my criteria
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="3">Basic</th>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.gender === "M"
                      ? "Male"
                      : "Female"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.gender ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.Age ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.Age === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Lives in:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.countryLive ||
                      "Not Available"}
                    ,
                    {publicProfileData?.user_profile_data?.stateLive ||
                      "Not Available"}
                    ,
                    {publicProfileData?.user_profile_data?.cityLive ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.countryLive ||
                    publicProfileData?.match_my_criteria?.stateLive ||
                    publicProfileData?.match_my_criteria?.cityLive ===
                      true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Relocate:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.willingToRelocate ||
                      "Not Available"}{" "}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.willingToRelocate ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colspan="5">Appearance</th>
                </tr>
                <tr>
                  <td>Hair color:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.hairColor ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.hairColor ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hair length:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.hairLength ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.hairLength ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hair type:</td>
                  <td class="ag_26">
                    {publicProfileData?.user_profile_data?.hairType ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.hairType ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Eye color:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.eyeColor ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.eyeColor ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Eye wear:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.eyeWear ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.eyeWear ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Height:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.height ||
                      "Not Available"}
                    '
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.height ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.weight ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.weight ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Body type:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.bodyType ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.bodyType ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Ethnicity:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.ethnicity ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.ethnicity ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr class="collapsable">
                  <td>Facial hair:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.facialHair ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.facialHair ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Best feature:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.bestFeature ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.bestFeature ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Body art:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.bodyArt ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.bodyArt ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Appearance:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.apperance ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.apperance ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colspan="5">Lifestyle</th>
                </tr>
                <tr>
                  <td>Drink:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.drink ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.drink ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Smoke:</td>
                  <td class="ag_51">
                    {publicProfileData?.user_profile_data?.smoke ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.smoke ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Marital status:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.maritalStatus ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.maritalStatus ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Have Children:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.children ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.children ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Occupation:</td>
                  <td class="ag_40">
                    {publicProfileData?.user_profile_data?.occupation ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.occupation ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Employment status:</td>
                  <td class="ag_17">
                    {publicProfileData?.user_profile_data?.employmentStatus ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.employmentStatus ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Income:</td>
                  <td class="ag_29">
                    {publicProfileData?.user_profile_data?.annualIncome ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.annualIncome ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Home type:</td>
                  <td class="ag_28">
                    {publicProfileData?.user_profile_data?.homeType ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.homeType ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Living situation:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.livingSituation ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.livingSituation ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colspan="5">Background / Cultural Values</th>
                </tr>
                <tr>
                  <td>Nationality::</td>
                  <td class="ag_38">
                    {publicProfileData?.user_profile_data?.nationality ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.nationality ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Education::</td>
                  <td>
                    {publicProfileData?.user_profile_data?.education ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.education ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Languages spoken:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.language ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.language ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>English ability:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.englishAbility ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.englishAbility ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Russian ability:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.russianAbility ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.russianAbility ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Religion::</td>
                  <td>
                    {publicProfileData?.user_profile_data?.religion ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.religion ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Star sign:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.starSign ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.starSign ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colspan="5">Personal</th>
                </tr>
                <tr>
                  <td>Bust cup size:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.bustCupSize ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.bustCupSize ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Bust From:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.bustMeasurement ||
                      "Not Available"}{" "}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.bustMeasurement ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Waist From:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.waistMeasurement ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.waistMeasurement ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hips measurement:</td>
                  <td>
                    {publicProfileData?.user_profile_data?.hipsMeasurement ||
                      "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.match_my_criteria?.hipsMeasurement ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colspan="5">Hobbies &amp; Interests</th>
                </tr>
                <tr>
                  <td>Entertainment:</td>
                  <td colspan="4">
                    {publicProfileData?.user_profile_data?.entertainment ||
                      "Not Available"}
                  </td>
                </tr>
                <tr>
                  <td>Food:</td>
                  <td colspan="4">
                    {publicProfileData?.user_profile_data?.food ||
                      "Not Available"}
                  </td>
                </tr>
                <tr>
                  <td>Music:</td>
                  <td colspan="4">
                    {publicProfileData?.user_profile_data?.music ||
                      "Not Available"}
                  </td>
                </tr>
                <tr>
                  <td>Sport:</td>
                  <td colspan="4">
                    {publicProfileData?.user_profile_data?.sport ||
                      "Not Available"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
