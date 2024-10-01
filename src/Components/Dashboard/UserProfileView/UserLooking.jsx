import React from "react";

const UserLooking = ({ publicProfileData }) => {
  return (
    <div
      class="tab-pane fade active show"
      id="looking_for"
      role="tabpanel"
      aria-labelledby="looking-for-tab"
    >
      <div class="card">
        <div class="card-content">
          <div class="table-responsive">
            <table class="table table-match bordered hide-on-small-only">
              <thead>
                <tr>
                  <th style={{ width: "45%" }}>Type</th>
                  <th>He's/She's looking for</th>
                  <th class="right-align">I match their criteria</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="3">Basic</th>
                </tr>
                <tr>
                  <td>Gender:</td>

                  <td>
                    {publicProfileData?.user_match_data?.looking_for === "M"
                      ? "Male"
                      : "Female" || "Not Available"}
                  </td>
                  <td>
                    {publicProfileData?.user_match_data?.looking_for ===
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
                    {publicProfileData?.user_match_data?.ageMin || "Any"} -{" "}
                    {publicProfileData?.user_match_data?.ageMax || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.ageMin ||
                    publicProfileData?.I_match_their_criteria?.ageMax ===
                      true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Lives in:</td>

                  <td>
                    {publicProfileData?.user_match_data?.countryLive || "Any"},
                    {publicProfileData?.user_match_data?.stateLive || "Any"},
                    {publicProfileData?.user_match_data?.cityLive || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.countryLive ||
                    publicProfileData?.I_match_their_criteria?.stateLive ||
                    publicProfileData?.I_match_their_criteria?.cityLive ===
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
                    {publicProfileData?.user_match_data?.willingToRelocate ||
                      "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.willingToRelocate === true ? (
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
                    {publicProfileData?.user_match_data?.hairColor?.length > 0
                      ? publicProfileData.user_match_data.hairColor.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.hairColor === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hair length:</td>

                  <td>
                    {publicProfileData?.user_match_data?.hairLength?.length > 0
                      ? publicProfileData.user_match_data.hairLength.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.hairLength === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hair type:</td>

                  <td>
                    {publicProfileData?.user_match_data?.hairType?.length > 0
                      ? publicProfileData.user_match_data.hairType.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.hairType === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Eye color:</td>

                  <td>
                    {publicProfileData?.user_match_data?.eyeColor?.length > 0
                      ? publicProfileData.user_match_data.eyeColor.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.eyeColor === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Eye wear:</td>

                  <td>
                    {publicProfileData?.user_match_data?.eyeWear?.length > 0
                      ? publicProfileData.user_match_data.eyeWear.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.eyeWear === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Height:</td>

                  <td>
                    {publicProfileData?.user_match_data?.minHeight || "Any"} -{" "}
                    {publicProfileData?.user_match_data?.maxHeight || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.minHeightn ||publicProfileData?.I_match_their_criteria
                      ?.maxHeight === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Weight:</td>

                  <td>
                    {publicProfileData?.user_match_data?.minWeight || "Any"} -{" "}
                    {publicProfileData?.user_match_data?.maxWeight || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.minWeight ||publicProfileData?.I_match_their_criteria
                      ?.maxWeight === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Body type:</td>

                  <td>
                    {publicProfileData?.user_match_data?.bodyType?.length > 0
                      ? publicProfileData.user_match_data.bodyType.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.bodyType === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Ethnicity:</td>

                  <td>
                    {publicProfileData?.user_match_data?.ethnicity?.length > 0
                      ? publicProfileData.user_match_data.ethnicity.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.ethnicity ===
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
                    {publicProfileData?.user_match_data?.facialHair?.length > 0
                      ? publicProfileData.user_match_data.facialHair.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.facialHair ===
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
                    {publicProfileData?.user_match_data?.bestFeature?.length > 0
                      ? publicProfileData.user_match_data.bestFeature.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.bestFeature ===
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
                    {publicProfileData?.user_match_data?.bodyArt?.length > 0
                      ? publicProfileData.user_match_data.bodyArt.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.bodyArt ===
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
                    {publicProfileData?.user_match_data?.apperance?.length > 0
                      ? publicProfileData.user_match_data.apperance.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.apperance ===
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
                    {publicProfileData?.user_match_data?.drink?.length > 0
                      ? publicProfileData.user_match_data.drink.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.drink ===
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
                    {publicProfileData?.user_match_data?.smoke?.length > 0
                      ? publicProfileData.user_match_data.smoke.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.smoke ===
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
                    {publicProfileData?.user_match_data?.maritalStatus?.length >
                    0
                      ? publicProfileData.user_match_data.maritalStatus.join(
                          ", "
                        )
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.maritalStatus === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Have Children:</td>

                  <td>
                    {publicProfileData?.user_match_data?.children?.length > 0
                      ? publicProfileData.user_match_data.children.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.children ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Occupation:</td>

                  <td>
                    {publicProfileData?.user_match_data?.occupation?.length > 0
                      ? publicProfileData.user_match_data.occupation.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.occupation ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Employment status:</td>

                  <td>
                    {publicProfileData?.user_match_data?.employmentStatus
                      ?.length > 0
                      ? publicProfileData.user_match_data.employmentStatus.join(
                          ", "
                        )
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.employmentStatus === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Income:</td>

                  <td>
                    {publicProfileData?.user_match_data?.annualIncome || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.annualIncome ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Home type:</td>

                  <td>
                    {publicProfileData?.user_match_data?.homeType?.length > 0
                      ? publicProfileData.user_match_data.homeType.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.homeType ===
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
                    {publicProfileData?.user_match_data?.livingSituation
                      ?.length > 0
                      ? publicProfileData.user_match_data.livingSituation.join(
                          ", "
                        )
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.livingSituation === true ? (
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

                  <td>
                    {publicProfileData?.user_match_data?.nationality?.length > 0
                      ? publicProfileData.user_match_data.nationality.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.nationality ===
                    true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Education:</td>

                  <td>
                    {publicProfileData?.user_match_data?.education || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.education ===
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
                    {publicProfileData?.user_match_data?.language?.length > 0
                      ? publicProfileData.user_match_data.language.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.language ===
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
                    {publicProfileData?.user_match_data?.englishAbility === -1
                      ? "Any"
                      : "" || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.englishAbility === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Russian ability:</td>

                  <td>
                    {publicProfileData?.user_match_data?.russianAbility === -1
                      ? "Any"
                      : "" || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.russianAbility === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Religion::</td>

                  <td>
                    {publicProfileData?.user_match_data?.religion || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.favoriteMovie === true ? (
                      <i class="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i class="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Star sign:</td>

                  <td>
                    {publicProfileData?.user_match_data?.starSign?.length > 0
                      ? publicProfileData.user_match_data.starSign.join(", ")
                      : "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria?.starSign ===
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
                    {publicProfileData?.user_match_data?.bustCupSize?.length > 0
                      ? publicProfileData.user_match_data.bustCupSize.join(", ")
                      : "N/A"}
                  </td>

                  <td>
                    {publicProfileData?.I_match_their_criteria?.bustCupSize ? (
                      <i className="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i className="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Bust From:</td>
                  <td>
                    {publicProfileData?.user_match_data?.bustMeasurementMin ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.bustMeasurementMin || "Any"}{" "}
                    -{" "}
                    {publicProfileData?.user_match_data?.bustMeasurementMax ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.bustMeasurementMax || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.bustMeasurementMin &&
                    publicProfileData?.I_match_their_criteria
                      ?.bustMeasurementMax ? (
                      <i className="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i className="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Waist From:</td>
                  <td>
                    {publicProfileData?.user_match_data?.waistMeasurementMin ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.waistMeasurementMin || "Any"}{" "}
                    -{" "}
                    {publicProfileData?.user_match_data?.waistMeasurementMax ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.waistMeasurementMax || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.waistMeasurementMin &&
                    publicProfileData?.I_match_their_criteria
                      ?.waistMeasurementMax ? (
                      <i className="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i className="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Hips Measurement:</td>
                  <td>
                    {publicProfileData?.user_match_data?.hipsMeasurementMin ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.hipsMeasurementMin || "Any"}{" "}
                    -{" "}
                    {publicProfileData?.user_match_data?.hipsMeasurementMax ===
                    "-1"
                      ? "Any"
                      : publicProfileData?.user_match_data
                          ?.hipsMeasurementMax || "Any"}
                  </td>
                  <td>
                    {publicProfileData?.I_match_their_criteria
                      ?.hipsMeasurementMin &&
                    publicProfileData?.I_match_their_criteria
                      ?.hipsMeasurementMax ? (
                      <i className="zmdi zmdi-check-circle text-green"></i>
                    ) : (
                      <i className="zmdi zmdi-close-circle text-red"></i>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="spacer-20"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLooking;
