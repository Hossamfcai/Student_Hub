import ProfileHero from "../../components/ProfileHero";
import SkillsCard from "../../components/SkillsCard";
import ConnectLinks from "../../components/ConnectLinks";
import PersonalDetails from "../../components/PersonalDetails";
import AcademicProfile from "../../components/AcademicProfile";
export default function Profile() {
  return (
    <section className="flex flex-col gap-5">
      <ProfileHero />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <SkillsCard />
          <ConnectLinks />
        </div>
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
            <PersonalDetails />
            <AcademicProfile />
          </div>
        </div>
      </div>
    </section>
  );
}
