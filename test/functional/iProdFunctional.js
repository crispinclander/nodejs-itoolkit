// Copyright (c) International Business Machines Corp. 2019

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-env mocha */
/* eslint-disable new-cap */

const { expect } = require('chai');
const { Connection, iProd } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');

describe('iProd Functional Tests', () => {
  before(() => {
    printConfig();
  });

  describe('getPTFInfo', () => {
    it('returns info for specified ptf', (done) => {
      const connection = new Connection(config);

      const prod = new iProd(connection);

      prod.getPTFInfo('SI67726', (error, ptf) => {
        expect(error).to.equal(null);
        expect(ptf).to.be.an('Object');
        expect(ptf).to.have.a.property('Product_ID');
        expect(ptf).to.have.a.property('PTF_ID');
        expect(ptf).to.have.a.property('Release_level');
        expect(ptf).to.have.a.property('Product_option');
        expect(ptf).to.have.a.property('Load_ID');
        expect(ptf).to.have.a.property('Loaded_status');
        expect(ptf).to.have.a.property('Cover_letter_status');
        expect(ptf).to.have.a.property('On-order_status');
        expect(ptf).to.have.a.property('Save_file_status');
        expect(ptf).to.have.a.property('File_name');
        expect(ptf).to.have.a.property('File_library_name');
        expect(ptf).to.have.a.property('PTF_type');
        expect(ptf).to.have.a.property('IPL_action');
        expect(ptf).to.have.a.property('Action_pending');
        expect(ptf).to.have.a.property('Action_required');
        expect(ptf).to.have.a.property('PTF_is_released');
        expect(ptf).to.have.a.property('Target_release');
        expect(ptf).to.have.a.property('Superseding_PTF');
        expect(ptf).to.have.a.property('Current_IPL_source');
        expect(ptf).to.have.a.property('Minimum_level');
        expect(ptf).to.have.a.property('Maximum_level');
        expect(ptf).to.have.a.property('Format_information_available');
        expect(ptf).to.have.a.property('Status_date_and_time');
        expect(ptf).to.have.a.property('Licensed_Internal_Code_group');
        expect(ptf).to.have.a.property('Superseded_by_PTF_ID');
        expect(ptf).to.have.a.property('Current_server_IPL_source');
        expect(ptf).to.have.a.property('Server_IPL_required');
        expect(ptf).to.have.a.property('Creation_date_and_time');
        expect(ptf).to.have.a.property('Technology_refresh_PTF');
        done();
      });
    });
  });

  describe('getProductInfo', () => {
    it('returns info for specified product', (done) => {
      const connection = new Connection(config);

      const prod = new iProd(connection);

      prod.getProductInfo('5770DG1', (error, product) => {
        expect(error).to.equal(null);
        expect(product).to.be.an('Object');
        expect(product).to.have.a.property('Product_ID');
        expect(product).to.have.a.property('Release_level');
        expect(product).to.have.a.property('Product_option');
        expect(product).to.have.a.property('Load_ID');
        expect(product).to.have.a.property('Symbolic_load_state');
        expect(product).to.have.a.property('Load_error_indicator');
        expect(product).to.have.a.property('Load_state');
        expect(product).to.have.a.property('Supported_flag');
        expect(product).to.have.a.property('Registration_type');
        expect(product).to.have.a.property('Registration_value');
        expect(product).to.have.a.property('Offset_to_additional_information');
        expect(product).to.have.a.property('Primary_language_load_identifier');
        expect(product).to.have.a.property('Minimum_target_release');
        expect(product).to.have.a.property('Minimum_VRM_of_*BASE_required_by_option');
        expect(product).to.have.a.property('Requirements_met_between_base_and_option_value');
        expect(product).to.have.a.property('Level');
        done();
      });
    });
  });

  // REST transport currently failing with 414 URI Too Long response code
  // The requested URL's length exceeds the capacity limit for this server
  describe('getInstalledProducts', () => {
    // eslint-disable-next-line func-names
    it('returns info for installed products', (done) => {
      const connection = new Connection(config);

      const prod = new iProd(connection);

      prod.getInstalledProducts((error, products) => {
        expect(error).to.equal(null);
        expect(products).to.be.an('Array');
        expect(products.length).to.be.greaterThan(0);

        products.forEach((product) => {
          expect(product).to.be.an('Object');
          expect(product).to.have.a.property('Product_ID');
          expect(product).to.have.a.property('Product_option');
          expect(product).to.have.a.property('Release_level');
          expect(product).to.have.a.property('Description_text_message_ID');
          expect(product).to.have.a.property('Description_text_object_name');
          expect(product).to.have.a.property('Description_text_library_name');
          expect(product).to.have.a.property('Installed_flag');
          expect(product).to.have.a.property('Supported_flag');
          expect(product).to.have.a.property('Registration_type');
          expect(product).to.have.a.property('Registration_value');
          expect(product).to.have.a.property('Description_text');
        });
        done();
      });
    });
  });
});
