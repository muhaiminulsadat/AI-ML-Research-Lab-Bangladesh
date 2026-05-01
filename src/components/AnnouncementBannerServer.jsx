import {getLatestWorkshop} from "@/actions/workshop.action";
import AnnouncementBanner from "./AnnouncementBanner";

export default async function AnnouncementBannerServer() {
  const result = await getLatestWorkshop();
  const workshopSlug = result.success ? result.data.slug : null;

  return <AnnouncementBanner workshopSlug={workshopSlug} />;
}
