/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import * as cdk from 'aws-cdk-lib';
import { OrganizationalUnits } from '../../index';
import { snapShotTest } from '../snapshot-test';

const testNamePrefix = 'Construct(OrganizationalUnit): ';

//Initialize stack for snapshot test and resource configuration test
const stack = new cdk.Stack();

new OrganizationalUnits(stack, 'OrganizationalUnits', {
  acceleratorConfigTable: new cdk.aws_dynamodb.Table(stack, 'ConfigTable', {
    partitionKey: { name: 'dataType', type: cdk.aws_dynamodb.AttributeType.STRING },
  }),
  commitId: 'bda32a39',
  controlTowerEnabled: true,
  organizationsEnabled: true,
  kmsKey: new cdk.aws_kms.Key(stack, 'CustomKey', {}),
  logRetentionInDays: 365,
});

/**
 * OrganizationalUnit construct test
 */
describe('OrganizationalUnits', () => {
  snapShotTest(testNamePrefix, stack);
});