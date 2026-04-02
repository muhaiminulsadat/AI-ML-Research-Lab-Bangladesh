import {createAccessControl} from "better-auth/plugins";
import {adminAc, defaultStatements} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  application: ["read", "approve", "reject"],
  member: ["read", "revoke"],
};

const baseStatements = {
  application: [],
  member: ["read"],
};

export const ac = createAccessControl(statement);

export const memberRole = ac.newRole(baseStatements);
export const advisorRole = ac.newRole(baseStatements);
export const core_panelRole = ac.newRole(baseStatements);

export const adminRole = ac.newRole({
  ...adminAc.statements,
  application: ["read", "approve", "reject"],
  member: ["read", "revoke"],
});
