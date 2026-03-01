import { Col, Form, Row, Select } from "antd";
import React, { useState } from "react";
import { message } from "antd";

const ProfileForm = () => {
  const { Item } = Form;
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
    message.info(!isEdit ? "Editing Profile" : "Profile Updated");
  };
  const cities = [
    "abbottabad",
    "ahmedpur east",
    "arifwala",
    "attock",
    "bahawalnagar",
    "bahawalpur",
    "burewala",
    "chakwal",
    "chaman",
    "chiniot",
    "dera ghazi khan",
    "dera ismail khan",
    "faisalabad",
    "gojra",
    "gujranwala",
    "gujrat",
    "hafizabad",
    "hyderabad",
    "islamabad",
    "jaccoabad",
    "jhang",
    "jhelum",
    "kamoke",
    "karachi",
    "kasur",
    "khairpur",
    "khanewal",
    "khanpur",
    "kohat",
    "kot addu",
    "lahore",
    "larkana",
    "mardan",
    "mianwali",
    "mingora",
    "mirpur khas",
    "multan",
    "muzaffargarh",
    "nawabshah",
    "nowshera",
    "okara",
    "pakpattan",
    "peshawar",
    "quetta",
    "rahim yar khan",
    "rawalpindi",
    "sahiwal",
    "sargodha",
    "sheikhupura",
    "sialkot",
    "sukkur",
    "tando adam",
    "wah cantt",
  ];
  return (
    <div className="my-10">
      <div className="rounded-2xl shadow-xl border border-gray-400 p-5">
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Profile Information</h2>
                <button onClick={handleEdit} className="btn-primary">
                  {isEdit ? "Save" : "Edit"}
                </button>
              </div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"First Name:"} layout="vertical">
                <input disabled={!isEdit} className="auth-field" />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Last Name:"} layout="vertical">
                <input disabled={!isEdit} className="auth-field" />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Email:"} layout="vertical">
                <input disabled={!isEdit} className="auth-field" />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Phone:"} layout="vertical">
                <input disabled={!isEdit} className="auth-field" />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="h-full!">
              <Item label={"City:"} layout="vertical">
                <Select
                  className="capitalize! mt-4.5!"
                  disabled={!isEdit}
                  showSearch
                >
                  {cities.map((city) => {
                    return <Select.Option value={city}>{city}</Select.Option>;
                  })}
                </Select>
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Address:"} layout="vertical">
                <input disabled={!isEdit} className="auth-field" />
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
