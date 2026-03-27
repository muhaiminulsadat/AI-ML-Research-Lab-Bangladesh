import {createAccessControl} from "better-auth/plugins";
import {adminAc, defaultStatements} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  application: ["read", "approve", "reject"],
  member: ["read", "revoke"],
};

export const ac = createAccessControl(statement);

export const generalRole = ac.newRole({
  application: [],
  member: [],
});

export const memberRole = ac.newRole({
  application: [],
  member: ["read"],
});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  application: ["read", "approve", "reject"],
  member: ["read", "revoke"],
});
