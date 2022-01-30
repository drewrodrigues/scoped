import React, { useEffect } from "react";
import { View } from "./view";
import senior from "../images/senior.jpg";
import videochat from "../images/videochat.jpg";
import alert from "../images/alert.jpg";
import brownbag from "../images/brownbag.jpg";
import course from "../images/course.jpg";
import book from "../images/book.jpg";
import "./_dashboard.scss";
import {
  FaBox,
  FaBrain,
  FaCheck,
  FaLaptop,
  FaPlus,
  FaUser,
} from "react-icons/fa";

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  function randomOpacity() {
    return Math.random() + 0.05;
  }

  return (
    <View title="">
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h5 className="dashboard__header-title">Goals</h5>
          {/* <button className="card__placehold-button">New Goal</button> */}
        </div>
        <div className="dashboard__section-content">
          <div className="card">
            <img src={senior} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">Become a senior engineer</h5>
              <button className="card__status-button card__status-button--started">
                In Progress
              </button>
              <p className="card__date">Due 5 days from now</p>
            </div>
          </div>

          <div className="card" style={{ opacity: 0.3 }}>
            <img src={videochat} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">
                Get 10 people on the team to connect
              </h5>
              <button className="card__status-button card__status-button--not-started">
                Not Started
              </button>
              <p className="card__date">Due 20 days from now</p>
            </div>
          </div>

          <div className="card" style={{ opacity: 0.3 }}>
            <img src={alert} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">Create a bug alert</h5>
              <button className="card__status-button card__status-button--not-started">
                Not Started
              </button>
              <p className="card__date">Due 30 days from now</p>
            </div>
          </div>

          <div className="card" style={{ opacity: 0.3 }}>
            <img src={brownbag} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">Do a brown bag on a topic</h5>
              <button className="card__status-button card__status-button--not-started">
                Not Started
              </button>
              <p className="card__date">Due 50 days from now</p>
            </div>
          </div>

          <div className="card" style={{ opacity: 0.3 }}>
            <img src={course} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">Complete a software course</h5>
              <button className="card__status-button card__status-button--not-started">
                Not Started
              </button>
              <p className="card__date">Due 50 days from now</p>
            </div>
          </div>

          <div className="card" style={{ opacity: 0.3 }}>
            <img src={book} alt="" className="card__img" />
            <div className="card__content">
              <h5 className="card__title">Complete a software book</h5>
              <button className="card__status-button card__status-button--not-started">
                Not Started
              </button>
              <p className="card__date">Due 50 days from now</p>
            </div>
          </div>
        </div>
      </section>

      <main className="dashboard__thirds">
        <aside className="dashboard__third dashboard__habits">
          <h4 className="dashboard__header">Habits</h4>
          {/* this is the pulse */}
          <div>
            <ul className="dashboard__habit-list">
              {new Array(100).fill(0).map((_, i) => (
                <li
                  key={i}
                  className="dashboard__habit-item"
                  style={{ opacity: randomOpacity() }}
                ></li>
              ))}
            </ul>
          </div>
          <div className="dashboard__habit-checker">
            <ul className="dashboard__habit-checker-days">
              <li className="dashboard__habit-checker-day">M</li>
              <li className="dashboard__habit-checker-day">T</li>
              <li className="dashboard__habit-checker-day">W</li>
              <li className="dashboard__habit-checker-day">T</li>
              <li className="dashboard__habit-checker-day">F</li>
            </ul>

            <li className="dashboard__habit">
              <button style={{ background: "rgba(0, 128, 0, 0.2)" }}>
                <FaCheck style={{ color: "green" }} />
              </button>
              <button style={{ background: "rgba(0, 128, 0, 0.2)" }}>
                <FaCheck style={{ color: "green" }} />
              </button>
              <button></button>
              <button></button>
              <button style={{ background: "rgba(0, 128, 0, 0.2)" }}>
                <FaCheck style={{ color: "green" }} />
              </button>
              <span style={{ opacity: 0.2 }}>Check email</span>
            </li>
            <li className="dashboard__habit">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              Check upcoming dates
            </li>
            <li className="dashboard__habit">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              Review 1 PR
            </li>
            <li className="dashboard__habit">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              Engage in 1 post
            </li>
            <li className="dashboard__habit">
              <button style={{ background: "rgba(0, 128, 0, 0.2)" }}>
                <FaCheck style={{ color: "green" }} />
              </button>
              <button className="dashboard__habit-button--spacer"></button>
              <button></button>
              <button className="dashboard__habit-button--spacer"></button>
              <button></button>
              <span style={{ opacity: 0.2 }}>Check telemetry</span>
            </li>
            <li className="dashboard__habit">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              Write about what I learned
            </li>
            <li className="dashboard__habit">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              <button></button>
              Learn something new
            </li>

            <input type="text" />
            <button>
              <FaPlus />
            </button>
          </div>
        </aside>

        <section className="dashboard__third">
          <h4 className="dashboard__header">Tasks</h4>
          <div>
            <ul className="dashboard__task-list">
              <li className="dashboard__task-list-item-header">
                <p>General</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Unit test updating</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Improve logs</p>
              </li>
              <li className="dashboard__task-list-item-header">
                <FaLaptop />
                <p>Code</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Dev/Prod FPA</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Add strict null checks to server</p>
              </li>
              <li className="dashboard__task-list-item-header">
                <FaBox />
                <p>Deployment</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Learn about different equality checks</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Review DRI knowledge sharing session 1</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Learn about different equality checks</p>
              </li>
              <li className="dashboard__task-list-item-header">
                <FaUser />
                <p>Culture</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Setup coffee pals</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Review DRI knowledge sharing session 1</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Learn about different equality checks</p>
              </li>
              <li className="dashboard__task-list-item-header">
                <FaBrain />
                <p>Learning</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Learn about different equality checks</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Review DRI knowledge sharing session 1</p>
              </li>
              <li className="dashboard__task-list-item">
                <button />
                <p>Learn about different equality checks</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="dashboard__third dashboard__reminders">
          <h4 className="dashboard__header">Reminders</h4>
          <div></div>
        </section>
      </main>
    </View>
  );
}
